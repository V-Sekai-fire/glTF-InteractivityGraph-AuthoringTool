import {BehaveEngineNode, IBehaviourNodeProps} from "../../../BehaveEngineNode";

export class Normalize extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "NormalizeNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {a} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        const typeIndex = this.values['a'].type!
        const type: string = this.getType(typeIndex);
        let val: any;

        switch (type) {
            case "float3":
                // eslint-disable-next-line no-case-declarations
                const length = Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2));
                val = [
                    a[0]/length,
                    a[1]/length,
                    a[2]/length,
                ];
                break;
            default:
                throw Error("Invalid type")
        }

        return {'val': {id: "val", value: val, type: typeIndex}}
    }
}
