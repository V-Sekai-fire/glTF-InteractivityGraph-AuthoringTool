import {BehaveEngineNode, IBehaviourNodeProps, IValue} from "../../../BehaveEngineNode";

export class IsNaNNode extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "IsNaNNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string): Record<string, IValue> {
        const {a} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);

        const typeIndex = this.values['a'].type!
        const type: string = this.getType(typeIndex);
        let val: any;

        switch (type) {
            case "float":
                val = isNaN(Number(a));
                break;
            default:
                throw Error("Invalid type")
        }

        return {'val': {id: "val", value: val, type: this.getTypeIndex('bool')}}
    }
}
