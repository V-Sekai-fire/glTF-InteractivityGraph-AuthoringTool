import {BehaveEngineNode, IBehaviourNodeProps} from "../../../BehaveEngineNode";

export class Tangent extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "TangentNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {a} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        const typeIndex = this.values['a'].type!
        const type: string = this.getType(typeIndex);
        let val: any;

        switch (type) {
            case "float":
                val = Math.tan(a);
                break;
            case "float3":
                val = [
                    Math.tan(a[0]),
                    Math.tan(a[1]),
                    Math.tan(a[2]),
                ]
                break;
            default:
                throw Error("Invalid type")
        }

        return {'val': {id: "val", value: val, type: typeIndex}}
    }
}
