import {BehaveEngineNode, IBehaviourNodeProps} from "../../BehaveEngineNode";

export class DoN extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"n"}];

    _currentCount: number;

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "DoN";
        this.validateValues(this.values);
        this.validateFlows(this.flows);
        this.validateConfigurations(this.configuration);

        this._currentCount = 0;
        this.outValues.currentCount = {id: "currentCount", value: this._currentCount};
    }

    override processNode(flowSocket?: string) {
        const {n} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);

        if (flowSocket === "reset") {
            this._currentCount = 0;
            this.outValues.currentCount = {id: "currentCount", value: this._currentCount};
            return;
        }
        if (this._currentCount >= Number(n)) {
            return;
        }

        this._currentCount++;
        this.outValues.currentCount = {id: "currentCount", value: this._currentCount};
        super.processNode(flowSocket);
    }
}
