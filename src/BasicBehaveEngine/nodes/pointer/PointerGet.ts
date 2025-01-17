import {BehaveEngineNode, IBehaviourNodeProps} from "../../BehaveEngineNode";

export class PointerGet extends BehaveEngineNode {
    REQUIRED_CONFIGURATIONS = [{id: "pointer"}]

    _pointer: string;
    _pointerVals: { id: string }[];

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "PointerGet";
        this.validateValues(this.values);
        this.validateFlows(this.flows);
        this.validateConfigurations(this.configuration);

        const {pointer} = this.evaluateAllConfigurations(this.REQUIRED_CONFIGURATIONS.map(config => config.id));
        this._pointer = pointer;
        const valIds = this.parsePath(pointer);
        const generatedParams = [];
        for (let i = 0; i < valIds.length; i++) {
            generatedParams.push({id: valIds[i]});
        }
        this._pointerVals = generatedParams;
    }

    parsePath(path: string): string[] {
        const regex = /{([^}]+)}/g;
        const match = path.match(regex);
        const keys: string[] = [];

        if (!match) {
            return keys;
        }

        for (const m of match) {
            const key = m.slice(1, -1); // remove the curly braces from the match
            keys.push(key)
        }

        return keys;
    }

    populatePath(path: string, vals: any): string {
        let pathCopy = path
        for (const val of Object.keys(vals)) {
            pathCopy = pathCopy.replace(`{${val}}`, vals[val]);
        }
        return pathCopy;
    }

    override processNode(flowSocket?: string) {
        this.graphEngine.clearValueEvaluationCache();
        const vals = this.evaluateAllValues([...this._pointerVals].map(val => val.id));
        const populatedPath = this.populatePath(this._pointer, vals)
        this.graphEngine.processNodeStarted(this);

        if (this.graphEngine.isValidJsonPtr(populatedPath)) {
            const typeName = this.graphEngine.getPathtypeName(populatedPath);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const typeIndex = this.getTypeIndex(typeName!);

            return {
                'val':{id: "val", value: this.graphEngine.getPathValue(populatedPath), type: typeIndex},
                'isValid':{id: "isValid", value: true, type: this.getTypeIndex('bool')}
            };
        } else {
            return {
                'isValid':{id: "isValid", value: false, type: this.getTypeIndex('bool')}
            };
        }
    }
}

