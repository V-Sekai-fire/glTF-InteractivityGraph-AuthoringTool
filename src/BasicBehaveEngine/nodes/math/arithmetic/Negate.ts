import {BehaveEngineNode, IBehaviourNodeProps} from "../../../BehaveEngineNode";

export class Negate extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "NegateNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {a} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        const typeIndex = this.values['a'].type!
        const type: string = this.getType(typeIndex);
        let val: any;

        switch (type) {
            case "int":
                val = (-a) | 0;
                break;
            case "float":
                val = a * -1;
                break;
            case "float3":
                val = [
                    a[0] * -1,
                    a[1] * -1,
                    a[2] * -1,
                ]
                break;
            default:
                throw Error("Invalid type")
        }

        return {'val': {id: "val", value: val, type: typeIndex}}
    }
}
