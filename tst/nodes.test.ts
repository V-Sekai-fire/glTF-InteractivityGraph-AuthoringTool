import { jest } from '@jest/globals';
import {BasicBehaveEngine} from "../src/BasicBehaveEngine/BasicBehaveEngine";
import {BehaveEngineNode, IBehaviourNodeProps, IFlow} from '../src/BasicBehaveEngine/BehaveEngineNode';
import {Receive} from "../src/BasicBehaveEngine/nodes/customEvent/Receive";
import {Send} from "../src/BasicBehaveEngine/nodes/customEvent/Send";
import {Branch} from "../src/BasicBehaveEngine/nodes/flow/Branch";
import {Delay} from "../src/BasicBehaveEngine/nodes/flow/Delay";
import {Sequence} from "../src/BasicBehaveEngine/nodes/flow/Sequence";
import {ForLoop} from "../src/BasicBehaveEngine/nodes/flow/ForLoop";
import {OnTickNode} from "../src/BasicBehaveEngine/nodes/lifecycle/onTick";
import {DoN} from "../src/BasicBehaveEngine/nodes/flow/DoN";
import {VariableSet} from "../src/BasicBehaveEngine/nodes/variable/VariableSet";
import {WorldSet} from "../src/BasicBehaveEngine/nodes/world/WorldSet";
import {OnStartNode} from "../src/BasicBehaveEngine/nodes/lifecycle/onStart";
import {Switch} from "../src/BasicBehaveEngine/nodes/flow/Switch";
import {WorldGet} from "../src/BasicBehaveEngine/nodes/world/WorldGet";
import {WorldAnimateTo} from "../src/BasicBehaveEngine/nodes/world/WorldAnimateTo";
import {WhileLoop} from "../src/BasicBehaveEngine/nodes/flow/WhileLoop";
import {WaitAll} from "../src/BasicBehaveEngine/nodes/flow/WaitAll";
import {MultiGate} from "../src/BasicBehaveEngine/nodes/flow/MultiGate";
import {Throttle} from "../src/BasicBehaveEngine/nodes/flow/Throttle";
import {VariableGet} from "../src/BasicBehaveEngine/nodes/variable/VariableGet";
import {Euler} from "../src/BasicBehaveEngine/nodes/math/constants/Euler";
import {Pi} from "../src/BasicBehaveEngine/nodes/math/constants/Pi";
import {AbsoluteValue} from "../src/BasicBehaveEngine/nodes/math/arithmetic/AbsoluteValue";
import {Sign} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Sign";
import {Truncate} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Truncate";
import {Floor} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Floor";
import {Ceil} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Ceil";
import {Add} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Add";
import {Subtract} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Subtract";
import {Multiply} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Multiply";
import {Divide} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Divide";
import {Remainder} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Remainder";
import {Max} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Max";
import {Min} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Min";
import {DegreeToRadians} from "../src/BasicBehaveEngine/nodes/math/trigonometry/DegreeToRadians";
import {RadiansToDegrees} from "../src/BasicBehaveEngine/nodes/math/trigonometry/RadiansToDegrees";
import {Sine} from "../src/BasicBehaveEngine/nodes/math/trigonometry/Sine";
import {Cosine} from "../src/BasicBehaveEngine/nodes/math/trigonometry/Cosine";
import {Tangent} from "../src/BasicBehaveEngine/nodes/math/trigonometry/Tangent";
import {Arcsine} from "../src/BasicBehaveEngine/nodes/math/trigonometry/Arcsine";
import {Arccosine} from "../src/BasicBehaveEngine/nodes/math/trigonometry/Arccosine";
import {Arctangent} from "../src/BasicBehaveEngine/nodes/math/trigonometry/Arctangent";
import {Arctangent2} from "../src/BasicBehaveEngine/nodes/math/trigonometry/Arctangent2";
import {Log} from "../src/BasicBehaveEngine/nodes/math/exponential/Log";
import {Log2} from "../src/BasicBehaveEngine/nodes/math/exponential/Log2";
import {Log10} from "../src/BasicBehaveEngine/nodes/math/exponential/Log10";
import {CubeRoot} from "../src/BasicBehaveEngine/nodes/math/exponential/CubeRoot";
import {SquareRoot} from "../src/BasicBehaveEngine/nodes/math/exponential/SquareRoot";
import {Power} from "../src/BasicBehaveEngine/nodes/math/exponential/Power";
import {standardTypes} from "../src/authoring/AuthoringNodeSpecs";
import {Clamp} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Clamp";
import {Saturate} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Saturate";
import {Interpolate} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Interpolate";
import {Negate} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Negate";
import {Fraction} from "../src/BasicBehaveEngine/nodes/math/arithmetic/Fraction";
import {Exponential} from "../src/BasicBehaveEngine/nodes/math/exponential/Exponential";
import {HyperbolicCosine} from "../src/BasicBehaveEngine/nodes/math/hyperbolic/HyperbolicCosine";
import {HyperbolicSine} from "../src/BasicBehaveEngine/nodes/math/hyperbolic/HyperbolicSine";
import {HyperbolicTangent} from "../src/BasicBehaveEngine/nodes/math/hyperbolic/HyperbolicTangent";
import {InverseHyperbolicCosine} from "../src/BasicBehaveEngine/nodes/math/hyperbolic/InverseHyperbolicCosine";
import {InverseHyperbolicSine} from "../src/BasicBehaveEngine/nodes/math/hyperbolic/InverseHyperbolicSine";
import {InverseHyperbolicTangent} from "../src/BasicBehaveEngine/nodes/math/hyperbolic/InverseHyperbolicTangent";
import {Normalize} from "../src/BasicBehaveEngine/nodes/math/vector/Normalize";
import {VectorLength} from "../src/BasicBehaveEngine/nodes/math/vector/VectorLength";
import {Dot} from "../src/BasicBehaveEngine/nodes/math/vector/Dot";
import {Cross} from "../src/BasicBehaveEngine/nodes/math/vector/Cross";
import {Rotate3D} from "../src/BasicBehaveEngine/nodes/math/vector/Rotate3D";


describe('nodes', () => {
    let executionLog: string;
    let graphEngine: BasicBehaveEngine;
    let world: any;
    let defaultProps: IBehaviourNodeProps;

    beforeAll(() => {
        executionLog = "";
        world = {};
        graphEngine = new BasicBehaveEngine(1);

        defaultProps = {
            idToBehaviourNodeMap: new Map<string, BehaveEngineNode>(),
            graphEngine: graphEngine,
            variables: [],
            customEvents: [],
            types: standardTypes,
            id: '0',
            flows: [],
            values: [],
            configuration: [],
            addEventToWorkQueue: jest.fn,
        };
    })

    it('customEvent/receive', async () => {
        const receive: Receive = new Receive({
            ...defaultProps,
            configuration: [{ id: 'customEvent', value: 0 }],
            customEvents: [{ id: 'testCustomEvent', values: [{ id: 'text', type: 7 }] }],
            flows: [{ id: 'out' }],
        });
        await new Promise((resolve) => setTimeout(resolve, 500));

        graphEngine.emitCustomEvent('KHR_INTERACTIVITY:testCustomEvent', { text: 'test' });
        //wait for graph to emit
        await new Promise((resolve) => setTimeout(resolve, 1000));
        expect(receive.outValues.text.value).toBe('test');
    }, 3000);

    it('customEvent/send', async () => {
        const send: Send = new Send({
            ...defaultProps,
            configuration: [{ id: 'customEvent', value: 0 }],
            customEvents: [{ id: 'testCustomEvent', values: [{ id: 'text' }] }],
            values: [{ id: 'text', value: 'test', type: 7}],
        });

        // Replace the original function with the mock
        const argCapture = jest.fn();
        document.dispatchEvent = jest.fn<(event: Event) => boolean>().mockImplementation((event) => {
            argCapture(event.type as any);
            return true;
        });

        await send.processNode();
        expect(argCapture).toHaveBeenCalledWith('KHR_INTERACTIVITY:testCustomEvent');
    });

    it('flow/branch', async () => {
        const trueBranch: Branch = new Branch({
            ...defaultProps,
            values: [{ id: 'condition', value: "true", type: 0 }],
            flows: [
                { id: 'true', node: '0' },
                { id: 'false', node: '1' },
            ],
        });

        trueBranch.processFlow = jest.fn<(flow: IFlow) => Promise<void>>();
        await trueBranch.processNode();
        expect(trueBranch.processFlow).toHaveBeenCalledWith({ id: 'true', node: '0' });

        const falseBranch: Branch = new Branch({
            ...defaultProps,
            values: [{ id: 'condition', value: "false", type: 0 }],
            flows: [
                { id: 'true', node: '0' },
                { id: 'false', node: '1' },
            ],
        });

        falseBranch.processFlow = jest.fn<(flow: IFlow) => Promise<void>>();
        await falseBranch.processNode();
        expect(falseBranch.processFlow).toHaveBeenCalledWith({ id: 'false', node: '1' });
    });

    it('flow/delay', async () => {
        const delay: Delay = new Delay({
            ...defaultProps,
            values: [{ id: 'duration', value: 0.5, type: 2 }],
            flows: [
                { id: 'out', node: '0' }
            ]
        });
        delay.addEventToWorkQueue = jest.fn<(flow: IFlow) => Promise<void>>();
        delay.processNode('in');
        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(delay.addEventToWorkQueue).toHaveBeenCalledWith({"id": "out", "node": "0"});
    });

    it('flow/sequence', async () => {
        const sequence: Sequence = new Sequence({
            ...defaultProps,
            configuration: [{ id: 'numberOutputFlows', value: 3 }],
            flows: [
                { id: '0', node: '0' },
                { id: '1', node: '1' },
                { id: '2', node: '2' },
            ],
        });

        sequence.processFlow = jest.fn<(flow: IFlow) => Promise<void>>();
        await sequence.processNode();

        expect(sequence.processFlow).toHaveBeenCalledWith({ id: '0', node: '0' });
        expect(sequence.processFlow).toHaveBeenCalledWith({ id: '1', node: '1' });
        expect(sequence.processFlow).toHaveBeenCalledWith({ id: '2', node: '2' });
    });

    it('flow/forLoop', async () => {
        const forLoop: ForLoop = new ForLoop({
            ...defaultProps,
            values: [
                { id: 'startIndex', value: 0, type: 1 },
                { id: 'increment', value: 1, type: 1 },
                { id: 'endIndex', value: 5, type: 1 },
            ],
            flows: [
                { id: 'loopBody', node: '0' },
                { id: 'completed', node: '1' },
            ],
        });

        forLoop.processFlow = jest.fn<(flow: IFlow) => Promise<void>>();
        await forLoop.processNode();

        expect(forLoop.processFlow).toHaveBeenCalledWith({ id: 'loopBody', node: '0' });
        expect(forLoop.processFlow).toHaveBeenCalledWith({ id: 'completed', node: '1' });
        expect(forLoop.processFlow).toHaveBeenCalledTimes(6);
    });

    it('flow/doN', async () => {
        const doN: DoN = new DoN({
            ...defaultProps,
            configuration: [
                {id:"startCount", value:0}
            ],
            values: [
                { id: 'n', value: 2, type: 1},
            ],
            flows: [
                { id: 'out', node: '0' },
            ],
        });

        doN.processFlow = jest.fn<(flow: IFlow) => Promise<void>>();
        doN.processNode("in");
        doN.processNode("in");
        doN.processNode("in");

        expect(doN.processFlow).toHaveBeenCalledTimes(2);

        doN.processNode("reset");
        doN.processNode("in");
        expect(doN.processFlow).toHaveBeenCalledTimes(3);
    });

    it('flow/multiGate', async () => {
        const multiGate: MultiGate = new MultiGate({
            ...defaultProps,
            configuration: [
                { id: 'numberOutputFlows', value: 3 },
                { id: 'isRandom', value: false },
                { id: 'loop', value: false },
                { id: 'startIndex', value: 0 },
            ],
        });

        multiGate.processFlow = jest.fn<(flow: IFlow) => Promise<void>>();
        await multiGate.processNode('in');
        await multiGate.processNode('in');
        await multiGate.processNode('in');
        await multiGate.processNode('in');

        expect(multiGate.processFlow).toHaveBeenCalledTimes(3);
    });

    it('flow/switch', async () => {
        const switchNode: Switch = new Switch({
            ...defaultProps,
            configuration: [{ id: 'cases', value: 3 }],
            values: [{ id: 'selection', value: 1, type: 1 }],
            flows: [
                { id: '0', node: '0' },
                { id: '1', node: '1' },
                { id: '2', node: '2' },
            ],
        });

        switchNode.processFlow = jest.fn<(flow: IFlow) => Promise<void>>();
        await switchNode.processNode('in');

        expect(switchNode.processFlow).toHaveBeenCalledWith({ id: '1', node: '1' });

        const defaultSwitchNode: Switch = new Switch({
            ...defaultProps,
            configuration: [{ id: 'cases', value: 3 }],
            values: [{ id: 'selection', value: 4, type: 1 }],
            flows: [
                { id: '0', node: '0' },
                { id: '1', node: '1' },
                { id: '2', node: '2' },
                { id: 'default', node: '4' },
            ],
        });

        defaultSwitchNode.processFlow = jest.fn<(flow: IFlow) => Promise<void>>();
        await defaultSwitchNode.processNode('in');

        expect(defaultSwitchNode.processFlow).toHaveBeenCalledWith({ id: 'default', node: '4' });
    });

    it('flow/throttle', async () => {
        const throttleNode: Throttle = new Throttle({
            ...defaultProps,
            values: [{ id: 'delay', value: 1, type: 2 }],
        });

        await throttleNode.processNode('in');
        await throttleNode.processNode('in');
        expect(throttleNode.outValues.isThrottling.value).toBe(true);

        //clear throttle limit
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await throttleNode.processNode('in');
        expect(throttleNode.outValues.isThrottling.value).toBe(false);
    });

    it('flow/waitAll', async () => {
        const waitAll: WaitAll = new WaitAll({
            ...defaultProps,
            configuration: [{ id: 'numberInputFlows', value: 2 }],
            flows: [{ id: 'out', node: '1' }],
        });

        waitAll.processFlow = jest.fn<(flow: IFlow) => Promise<void>>();
        await waitAll.processNode('0');
        await waitAll.processNode('reset');
        await waitAll.processNode('1');
        expect(waitAll.processFlow).toHaveBeenCalledTimes(0);

        await waitAll.processNode('0');
        expect(waitAll.processFlow).toHaveBeenCalledTimes(1);
        expect(waitAll.processFlow).toHaveBeenCalledWith({ id: 'out', node: '1' });
    });

    it('flow/whileLoop', async () => {
        const whileLoop: WhileLoop = new WhileLoop({
            ...defaultProps,
            configuration: [{ id: 'isDo', value: false }],
            values: [{ id: 'condition', value: false, type: 0 }],
            flows: [
                { id: 'loopBody', node: '0' },
                { id: 'completed', node: '1' },
            ],
        });

        whileLoop.processFlow = jest.fn<(flow: IFlow) => Promise<void>>();
        await whileLoop.processNode();

        expect(whileLoop.processFlow).toHaveBeenCalledWith({ id: 'completed', node: '1' });
        expect(whileLoop.processFlow).toHaveBeenCalledTimes(1);

        const doWhileLoop: WhileLoop = new WhileLoop({
            ...defaultProps,
            configuration: [{ id: 'isDo', value: true }],
            values: [{ id: 'condition', value: false, type: 0 }],
            flows: [
                { id: 'loopBody', node: '0' },
                { id: 'completed', node: '1' },
            ],
        });

        doWhileLoop.processFlow = jest.fn<(flow: IFlow) => Promise<void>>();
        await doWhileLoop.processNode();

        expect(doWhileLoop.processFlow).toHaveBeenCalledWith({ id: 'loopBody', node: '0' });
        expect(doWhileLoop.processFlow).toHaveBeenCalledWith({ id: 'completed', node: '1' });
        expect(doWhileLoop.processFlow).toHaveBeenCalledTimes(2);
    });

    it('variable/get', async () => {
        const variableGet: VariableGet = new VariableGet({
            ...defaultProps,
            configuration: [{ id: 'variable', value: 0 }],
            variables: [{ id: 'testVariable', value: 42, initialValue: 42 }],
        });

        const res = await variableGet.processNode();
        expect(res.value).toBe(42);
    });

    it('variable/set', async () => {
        const variableSet: VariableSet = new VariableSet({
            ...defaultProps,
            configuration: [{ id: 'variable', value: 0 }],
            variables: [{ id: 'testVariable', initialValue: 42 }],
            values: [{ id: 'testVariable', value: 10, type: 1 }],
        });

        await variableSet.processNode('in');
        expect(variableSet.variables[0].value).toBe(10);
    });

    it('world/get', async () => {
        const world = {nodes:[{ value: 1 }, { value: 2 }]};
        const worldGet: WorldGet = new WorldGet({
            ...defaultProps,
            configuration: [{ id: 'path', value: 'nodes/{index}/value' }],
            values: [{ id: 'index', value: 1, type: 1 }],
        });
        graphEngine.registerJsonPointer(
            'nodes/99/value',
            (path) => {
                const parts: string[] = path.split('/');
                return world.nodes[Number(parts[1])].value;
            },
            (path, value) => {
                const parts: string[] = path.split('/');
                world.nodes[Number(parts[1])].value = value;
            },
            "float"
        );

        const res  = worldGet.processNode();
        expect(res.value).toBe(2);

        const worldGetCustomPtr: WorldGet = new WorldGet({
            ...defaultProps,
            configuration: [{ id: 'path', value: 'nodes/0/value' }],
        });

        const resCustom = await worldGetCustomPtr.processNode();
        expect(resCustom.value).toBe(1);
    });

    it('world/set', async () => {
        const world = {nodes:[{ value: 1 }, { value: 2 }]};
        graphEngine.registerJsonPointer(
            'nodes/99/value',
            (path) => {
                const parts: string[] = path.split('/');
                return world.nodes[Number(parts[1])].value;
            },
            (path, value) => {
                const parts: string[] = path.split('/');
               world.nodes[Number(parts[1])].value = value;
            },
            "float"
        );
        const worldSet: WorldSet = new WorldSet({
            ...defaultProps,
            configuration: [
                { id: 'path', value: 'nodes/{index}/value' },
            ],
            values: [
                { id: 'index', value: 0, type: 1 },
                { id: 'a', value: 42, type: 1 },
            ],
        });

        await worldSet.processNode('in');
        const res = world.nodes[0].value;
        expect(res).toBe(42);
    });

    it('world/animateTo', async () => {
        const world = {nodes:[{ value: 1 }, { value: 2 }]};
        graphEngine.registerJsonPointer(
            'nodes/99/value',
            (path) => {
                const parts: string[] = path.split('/');
                return world.nodes[Number(parts[1])].value;
            },
            (path, value) => {
                const parts: string[] = path.split('/');
                world.nodes[Number(parts[1])].value = value;
            },
            "float"
        );
        const worldAnimateTo: WorldAnimateTo = new WorldAnimateTo({
            ...defaultProps,
            configuration: [
                { id: 'path', value: 'nodes/{index}/value' },
                { id: "easingDuration", value: 0.5},
                { id: "easingType", value: "linear"}
            ],
            values: [
                { id: 'index', value: 0, type: 1 },
                { id: 'a', value: 42, type: 2 },
            ],
        });

        graphEngine.animateProperty = jest.fn(() => {
            world.nodes[0].value = 42;
        })
        worldAnimateTo.processNode('in');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        expect(graphEngine.animateProperty).toHaveBeenCalledTimes(1);
        expect(world.nodes[0].value).toBe(42);
    });

    it('lifecycle/onStart', async () => {
        const onStart: OnStartNode = new OnStartNode({
            ...defaultProps,
            flows: [
                { id: 'out', node: '0' }
            ],
        });

        onStart.processFlow = jest.fn<(flow: IFlow) => Promise<void>>();
        await onStart.processNode('in');
        expect(onStart.processFlow).toHaveBeenCalledWith({ id: 'out', node: '0' });
    });

    it('lifecycle/onTick', async () => {
        const onTick: OnTickNode = new OnTickNode({
            ...defaultProps,
            flows: [
                { id: 'out', node: '0' }
            ],
        });

        onTick.processFlow = jest.fn<(flow: IFlow) => Promise<void>>();
        await onTick.processNode('in');
        expect(onTick.processFlow).toHaveBeenCalledWith({ id: 'out', node: '0' });
    });

    it("math/e", () => {
        const euler: Euler = new Euler({
            ...defaultProps
        });

        const val = euler.processNode();
        expect(val.value).toBe(Math.E);
    });

    it("math/pi", () => {
        const pi: Pi = new Pi({
            ...defaultProps
        });

        const val = pi.processNode();
        expect(val.value).toBe(Math.PI);
    });

    it("math/abs", () => {
        let abs: AbsoluteValue = new AbsoluteValue({
            ...defaultProps,
            values: [
                {id: 'a', value: -10, type: 2}
            ]
        });

        let val = abs.processNode();
        expect(val.value).toBe(10);

        abs = new AbsoluteValue({
            ...defaultProps,
            values: [
                {id: 'a', value: [-10, 12, -20] , type: 4}
            ]
        });

        val = abs.processNode();
        expect(val.value[0]).toBe(10);
        expect(val.value[1]).toBe(12);
        expect(val.value[2]).toBe(20);
    });

    it("math/sign", () => {
        let sign: Sign = new Sign({
            ...defaultProps,
            values: [
                {id: 'a', value: -10, type: 2}
            ]
        });

        let val = sign.processNode();
        expect(val.value).toBe(-1);

        sign = new Sign({
            ...defaultProps,
            values: [
                {id: 'a', value: [-10, 0, 10] , type: 4}
            ]
        });

        val = sign.processNode();
        expect(val.value[0]).toBe(-1);
        expect(val.value[1]).toBe(0);
        expect(val.value[2]).toBe(1);
    });

    it("math/trunc", () => {
        let trunc: Truncate = new Truncate({
            ...defaultProps,
            values: [
                {id: 'a', value: -10.1201223, type: 2}
            ]
        });

        let val = trunc.processNode();
        expect(val.value).toBe(-10);

        trunc = new Truncate({
            ...defaultProps,
            values: [
                {id: 'a', value: [-10.123, 0.493, 10.12] , type: 4}
            ]
        });

        val = trunc.processNode();
        expect(val.value[0]).toBe(-10);
        expect(val.value[1]).toBe(0);
        expect(val.value[2]).toBe(10);
    });

    it("math/floor", () => {
        let floor: Floor = new Floor({
            ...defaultProps,
            values: [
                {id: 'a', value: -10.1201223, type: 2}
            ]
        });

        let val = floor.processNode();
        expect(val.value).toBe(-11);

        floor = new Floor({
            ...defaultProps,
            values: [
                {id: 'a', value: [-10.123, 0.493, 10.12] , type: 4}
            ]
        });

        val = floor.processNode();
        expect(val.value[0]).toBe(-11);
        expect(val.value[1]).toBe(0);
        expect(val.value[2]).toBe(10);
    });

    it("math/ceil", () => {
        let ceil: Ceil = new Ceil({
            ...defaultProps,
            values: [
                {id: 'a', value: -10.1201223, type: 2}
            ]
        });

        let val = ceil.processNode();
        expect(val.value).toBe(-10);

        ceil = new Ceil({
            ...defaultProps,
            values: [
                {id: 'a', value: [-10.123, 0.493, 10.12] , type: 4}
            ]
        });

        val = ceil.processNode();
        expect(val.value[0]).toBe(-10);
        expect(val.value[1]).toBe(1);
        expect(val.value[2]).toBe(11);
    });

    it("math/add", () => {
        let add: Add = new Add({
            ...defaultProps,
            values: [
                {id: 'a', value: -10.5, type: 2},
                {id: 'b', value: 5.5, type: 2}
            ]
        });

        let val = add.processNode();
        expect(val.value).toBe(-5);

        add = new Add({
            ...defaultProps,
            values: [
                {id: 'a', value: [-10.5, 0.5, 9] , type: 4},
                {id: 'b', value: [4, -6, 10] , type: 4}
            ]
        });

        val = add.processNode();
        expect(val.value[0]).toBe(-6.5);
        expect(val.value[1]).toBe(-5.5);
        expect(val.value[2]).toBe(19);
    });

    it("math/sub", () => {
        let sub: Subtract = new Subtract({
            ...defaultProps,
            values: [
                {id: 'a', value: -10.5, type: 2},
                {id: 'b', value: 5.5, type: 2}
            ]
        });

        let val = sub.processNode();
        expect(val.value).toBe(-16);

        sub = new Subtract({
            ...defaultProps,
            values: [
                {id: 'a', value: [-10.5, 0.5, 9] , type: 4},
                {id: 'b', value: [4, -6, 10] , type: 4}
            ]
        });

        val = sub.processNode();
        expect(val.value[0]).toBe(-14.5);
        expect(val.value[1]).toBe(6.5);
        expect(val.value[2]).toBe(-1);
    });

    it("math/mul", () => {
        let mul: Multiply = new Multiply({
            ...defaultProps,
            values: [
                {id: 'a', value: -10, type: 2},
                {id: 'b', value: 5.5, type: 2}
            ]
        });

        let val = mul.processNode();
        expect(val.value).toBe(-55);

        mul = new Multiply({
            ...defaultProps,
            values: [
                {id: 'a', value: [-10, -0.5, 9], type: 4},
                {id: 'b', value: [5, -6, 10], type: 4}
            ]
        });

        val = mul.processNode();
        expect(val.value[0]).toBe(-50);
        expect(val.value[1]).toBe(3);
        expect(val.value[2]).toBe(90);
    });

    it("math/div", () => {
        let div: Divide = new Divide({
            ...defaultProps,
            values: [
                {id: 'a', value: -10, type: 2},
                {id: 'b', value: 5, type: 2}
            ]
        });

        let val = div.processNode();
        expect(val.value).toBe(-2);

        div = new Divide({
            ...defaultProps,
            values: [
                {id: 'a', value: [0, -6, 9] , type: 4},
                {id: 'b', value: [-5, -0.5, 0] , type: 4}
            ]
        });

        val = div.processNode();
        expect(val.value[0]).toBe(-0);
        expect(val.value[1]).toBe(12);
        expect(val.value[2]).toBe(Infinity);
    });

    it("math/rem", () => {
        let rem: Remainder = new Remainder({
            ...defaultProps,
            values: [
                {id: 'a', value: -10, type: 2},
                {id: 'b', value: 5, type: 2}
            ]
        });

        let val = rem.processNode();
        expect(val.value).toBe(-0);

        rem = new Remainder({
            ...defaultProps,
            values: [
                {id: 'a', value: [-10, 10, 9] , type: 4},
                {id: 'b', value: [5, 6, 10] , type: 4}
            ]
        });

        val = rem.processNode();
        expect(val.value[0]).toBe(-0);
        expect(val.value[1]).toBe(4);
        expect(val.value[2]).toBe(9);
    });

    it("math/max", () => {
        let max: Max = new Max({
            ...defaultProps,
            values: [
                {id: 'a', value: -10, type: 2},
                {id: 'b', value: 5, type: 2}
            ]
        });

        let val = max.processNode();
        expect(val.value).toBe(5);

        max = new Max({
            ...defaultProps,
            values: [
                {id: 'a', value: [-10, 10, -9] , type: 4},
                {id: 'b', value: [5, 6, -10] , type: 4}
            ]
        });

        val = max.processNode();
        expect(val.value[0]).toBe(5);
        expect(val.value[1]).toBe(10);
        expect(val.value[2]).toBe(-9);
    });

    it("math/min", () => {
        let min: Min = new Min({
            ...defaultProps,
            values: [
                {id: 'a', value: -10, type: 2},
                {id: 'b', value: 5, type: 2}
            ]
        });

        let val = min.processNode();
        expect(val.value).toBe(-10);

        min = new Min({
            ...defaultProps,
            values: [
                {id: 'a', value: [-10, 10, -9] , type: 4},
                {id: 'b', value: [5, 6, -10] , type: 4}
            ]
        });

        val = min.processNode();
        expect(val.value[0]).toBe(-10);
        expect(val.value[1]).toBe(6);
        expect(val.value[2]).toBe(-10);
    });

    it("math/rad", () => {
        let rad: DegreeToRadians = new DegreeToRadians({
            ...defaultProps,
            values: [
                {id: 'a', value: 180, type: 2},
            ]
        });

        let val = rad.processNode();
        expect(val.value).toBe(Math.PI);

        rad = new DegreeToRadians({
            ...defaultProps,
            values: [
                {id: 'a', value: [-180, 45, 270] , type: 4}
            ]
        });

        val = rad.processNode();
        expect(val.value[0]).toBe(-Math.PI);
        expect(val.value[1]).toBe(Math.PI/4);
        expect(val.value[2]).toBe(Math.PI * (3/2));
    });

    it("math/deg", () => {
        let deg: RadiansToDegrees = new RadiansToDegrees({
            ...defaultProps,
            values: [
                {id: 'a', value: Math.PI, type: 2},
            ]
        });

        let val = deg.processNode();
        expect(val.value).toBe(180);

        deg = new RadiansToDegrees({
            ...defaultProps,
            values: [
                {id: 'a', value: [Math.PI * 2, -Math.PI, Math.PI * 4] , type: 4}
            ]
        });

        val = deg.processNode();
        expect(val.value[0]).toBe(360);
        expect(val.value[1]).toBe(-180);
        expect(val.value[2]).toBe(720);
    });

    it("math/sin", () => {
        let sin: Sine = new Sine({
            ...defaultProps,
            values: [
                {id: 'a', value: Math.PI, type: 2},
            ]
        });

        let val = sin.processNode();
        expect(isCloseToVal(val.value, 0)).toBe(true);

        sin = new Sine({
            ...defaultProps,
            values: [
                {id: 'a', value: [Math.PI * 2, -Math.PI/2, Math.PI/2] , type: 4}
            ]
        });

        val = sin.processNode();
        expect(isCloseToVal(val.value[0], 0)).toBe(true);
        expect(isCloseToVal(val.value[1], -1)).toBe(true);
        expect(isCloseToVal(val.value[2], 1)).toBe(true);
    });

    it("math/cos", () => {
        let cos: Cosine = new Cosine({
            ...defaultProps,
            values: [
                {id: 'a', value: Math.PI, type: 2},
            ]
        });

        let val = cos.processNode();
        expect(isCloseToVal(val.value, -1)).toBe(true);

        cos = new Cosine({
            ...defaultProps,
            values: [
                {id: 'a', value: [Math.PI * 2, -Math.PI/2, Math.PI/2], type: 4}
            ]
        });

        val = cos.processNode();
        expect(isCloseToVal(val.value[0], 1)).toBe(true);
        expect(isCloseToVal(val.value[1], 0)).toBe(true);
        expect(isCloseToVal(val.value[2], 0)).toBe(true);
    });

    it("math/tan", () => {
        let tan: Tangent = new Tangent({
            ...defaultProps,
            values: [
                {id: 'a', value: Math.PI / 4, type: 2},
            ]
        });

        let val = tan.processNode();
        expect(isCloseToVal(val.value, 1)).toBe(true);

        tan = new Tangent({
            ...defaultProps,
            values: [
                {id: 'a', value: [Math.PI, Math.PI / 2, 3 * Math.PI / 4], type: 4}
            ]
        });

        val = tan.processNode();
        expect(isCloseToVal(val.value[0], 0)).toBe(true);
        //TODO: this is weird it should be inf
        expect(val.value[1] ).toBe(16331239353195370);
        expect(isCloseToVal(val.value[2], -1)).toBe(true);
    });

    it("math/asin", () => {
        let asin: Arcsine = new Arcsine({
            ...defaultProps,
            values: [
                { id: 'a', value: 0.5, type: 2 },
            ]
        });

        let val = asin.processNode();
        expect(isCloseToVal(val.value, Math.asin(0.5))).toBe(true);

        asin = new Arcsine({
            ...defaultProps,
            values: [
                { id: 'a', value: [0.86602540378, 0, -0.86602540378], type: 4 }
            ]
        });

        val = asin.processNode();
        expect(isCloseToVal(val.value[0], Math.asin(0.86602540378))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.asin(0))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.asin(-0.86602540378))).toBe(true);
    });

    it("math/acos", () => {
        let acos: Arccosine = new Arccosine({
            ...defaultProps,
            values: [
                { id: 'a', value: 0.5, type: 2 },
            ]
        });

        let val = acos.processNode();
        expect(isCloseToVal(val.value, Math.acos(0.5))).toBe(true);

        acos = new Arccosine({
            ...defaultProps,
            values: [
                { id: 'a', value: [0.86602540378, 1, -0.86602540378], type: 4 }
            ]
        });

        val = acos.processNode();
        expect(isCloseToVal(val.value[0], Math.acos(0.86602540378))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.acos(1))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.acos(-0.86602540378))).toBe(true);
    });

    it("math/atan", () => {
        let atan: Arctangent = new Arctangent({
            ...defaultProps,
            values: [
                { id: 'a', value: 0.5, type: 2 },
            ]
        });

        let val = atan.processNode();
        expect(isCloseToVal(val.value, Math.atan(0.5))).toBe(true);

        atan = new Arctangent({
            ...defaultProps,
            values: [
                { id: 'a', value: [0.57735026919, 0, -0.57735026919], type: 4 }
            ]
        });

        val = atan.processNode();
        expect(isCloseToVal(val.value[0], Math.atan(0.57735026919))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.atan(0))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.atan(-0.57735026919))).toBe(true);
    });

    it("math/atan2", () => {
        let atan2: Arctangent2 = new Arctangent2({
            ...defaultProps,
            values: [
                { id: 'a', value: 1.0, type: 2 },
                { id: 'b', value: 1.0, type: 2 },
            ]
        });

        let val = atan2.processNode();
        expect(val.value).toBe(Math.atan2(1.0, 1.0));

        atan2 = new Arctangent2({
            ...defaultProps,
            values: [
                { id: 'a', value: [0.5, 0, -0.5], type: 4 },
                { id: 'b', value: [0.86602540378, 1, -0.86602540378], type: 4 },
            ]
        });

        val = atan2.processNode();
        expect(isCloseToVal(val.value[0], Math.atan2(0.5, 0.86602540378))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.atan2(0, 1))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.atan2(-0.5, -0.86602540378))).toBe(true);
    });

    it("math/log", () => {
        let log: Log = new Log({
            ...defaultProps,
            values: [
                { id: 'a', value: 2.0, type: 2 },
            ]
        });

        let val = log.processNode();
        expect(isCloseToVal(val.value, Math.log(2.0))).toBe(true);

        log = new Log({
            ...defaultProps,
            values: [
                { id: 'a', value: [1, Math.E, 10], type: 4 }
            ]
        });

        val = log.processNode();
        expect(isCloseToVal(val.value[0], Math.log(1))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.log(Math.E))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.log(10))).toBe(true);
    });

    it("math/log2", () => {
        let log2: Log2 = new Log2({
            ...defaultProps,
            values: [
                { id: 'a', value: 8.0, type: 2 },
            ]
        });

        let val = log2.processNode();
        expect(isCloseToVal(val.value, Math.log2(8.0))).toBe(true);

        log2 = new Log2({
            ...defaultProps,
            values: [
                { id: 'a', value: [1, 2, 16], type: 4 }
            ]
        });

        val = log2.processNode();
        expect(isCloseToVal(val.value[0], Math.log2(1))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.log2(2))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.log2(16))).toBe(true);
    });

    it("math/log10", () => {
        let log10: Log10 = new Log10({
            ...defaultProps,
            values: [
                { id: 'a', value: 100.0, type: 2 },
            ]
        });

        let val = log10.processNode();
        expect(isCloseToVal(val.value, Math.log10(100.0))).toBe(true);

        log10 = new Log10({
            ...defaultProps,
            values: [
                { id: 'a', value: [1, 10, 1000], type: 4 }
            ]
        });

        val = log10.processNode();
        expect(isCloseToVal(val.value[0], Math.log10(1))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.log10(10))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.log10(1000))).toBe(true);
    });

    it("math/cbrt", () => {
        let cubeRoot: CubeRoot = new CubeRoot({
            ...defaultProps,
            values: [
                { id: 'a', value: 8.0, type: 2 },
            ]
        });

        let val = cubeRoot.processNode();
        expect(isCloseToVal(val.value, Math.cbrt(8.0))).toBe(true);

        cubeRoot = new CubeRoot({
            ...defaultProps,
            values: [
                { id: 'a', value: [1, 27, 125], type: 4 }
            ]
        });

        val = cubeRoot.processNode();
        expect(isCloseToVal(val.value[0], Math.cbrt(1))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.cbrt(27))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.cbrt(125))).toBe(true);
    });

    it("math/sqrt", () => {
        let sqrt: SquareRoot = new SquareRoot({
            ...defaultProps,
            values: [
                { id: 'a', value: 16.0, type: 2 },
            ]
        });

        let val = sqrt.processNode();
        expect(isCloseToVal(val.value, Math.sqrt(16.0))).toBe(true);

        sqrt = new SquareRoot({
            ...defaultProps,
            values: [
                { id: 'a', value: [1, 4, 9], type: 4}
            ]
        });

        val = sqrt.processNode();
        expect(isCloseToVal(val.value[0], Math.sqrt(1))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.sqrt(4))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.sqrt(9))).toBe(true);
    });

    it("math/pow", () => {
        let pow: Power = new Power({
            ...defaultProps,
            values: [
                {id: 'a', value: 2, type: 2},
                {id: 'b', value: 3, type: 2}
            ]
        });

        let val = pow.processNode();
        expect(val.value).toBe(8);

        pow = new Power({
            ...defaultProps,
            values: [
                {id: 'a', value: [2, 0.5, 10] , type: 4},
                {id: 'b', value: [-2, 3, 3] , type: 4}
            ]
        });

        val = pow.processNode();
        expect(val.value[0]).toBe(0.25);
        expect(val.value[1]).toBe(0.125);
        expect(val.value[2]).toBe(1000);
    });

    it("math/exp", () => {
        let exp: Exponential = new Exponential({
            ...defaultProps,
            values: [
                {id: 'a', value: 2, type: 2}
            ]
        });

        let val = exp.processNode();
        expect(val.value).toBe(Math.exp(2));

        exp = new Exponential({
            ...defaultProps,
            values: [
                {id: 'a', value: [2, 0.5, -1] , type: 4},
            ]
        });

        val = exp.processNode();
        expect(val.value[0]).toBe(Math.exp(2));
        expect(val.value[1]).toBe(Math.exp(0.5));
        expect(val.value[2]).toBe(Math.exp(-1));
    });

    it("math/clamp", () => {
        let clamp: Clamp = new Clamp({
            ...defaultProps,
            values: [
                {id: 'a', value: 2.5, type: 2},
                {id: 'b', value: 0, type: 2},
                {id: 'c', value: 1, type: 2}
            ]
        });

        let val = clamp.processNode();
        expect(val.value).toBe(1);

        clamp = new Clamp({
            ...defaultProps,
            values: [
                {id: 'a', value: [-1, 0.5, 10] , type: 4},
                {id: 'b', value: [0, 0, 3] , type: 4},
                {id: 'c', value: [1, 1, 9] , type: 4},
            ]
        });

        val = clamp.processNode();
        expect(val.value[0]).toBe(0);
        expect(val.value[1]).toBe(0.5);
        expect(val.value[2]).toBe(9);
    });

    it("math/saturate", () => {
        let saturate: Saturate = new Saturate({
            ...defaultProps,
            values: [
                {id: 'a', value: 2.5, type: 2}
            ]
        });

        let val = saturate.processNode();
        expect(val.value).toBe(1);

        saturate = new Saturate({
            ...defaultProps,
            values: [
                {id: 'a', value: [-1, 0.5, 10] , type: 4},
            ]
        });

        val = saturate.processNode();
        expect(val.value[0]).toBe(0);
        expect(val.value[1]).toBe(0.5);
        expect(val.value[2]).toBe(1);
    });

    it("math/mix", () => {
        let mix: Interpolate = new Interpolate({
            ...defaultProps,
            values: [
                {id: 'a', value: 2.5, type: 2},
                {id: 'b', value: 0, type: 2},
                {id: 'c', value: 0.2, type: 2}
            ]
        });

        let val = mix.processNode();
        expect(val.value).toBe(2);

        mix = new Interpolate({
            ...defaultProps,
            values: [
                {id: 'a', value: [-1, 0.5, 10] , type: 4},
                {id: 'b', value: [0, 0, 0] , type: 4},
                {id: 'c', value: [0.75, 0, 2] , type: 4},
            ]
        });

        val = mix.processNode();
        expect(val.value[0]).toBe(-0.25);
        expect(val.value[1]).toBe(0.5);
        expect(val.value[2]).toBe(-10);
    });

    it("math/negate", () => {
        let neg: Negate = new Negate({
            ...defaultProps,
            values: [
                {id: 'a', value: 2.5, type: 2}
            ]
        });

        let val = neg.processNode();
        expect(val.value).toBe(-2.5);

        neg = new Negate({
            ...defaultProps,
            values: [
                {id: 'a', value: [-1, 0.5, 10] , type: 4},
            ]
        });

        val = neg.processNode();
        expect(val.value[0]).toBe(1);
        expect(val.value[1]).toBe(-0.5);
        expect(val.value[2]).toBe(-10);
    });

    it("math/fract", () => {
        let fract: Fraction = new Fraction({
            ...defaultProps,
            values: [
                {id: 'a', value: 2.5, type: 2}
            ]
        });

        let val = fract.processNode();
        expect(val.value).toBe(0.5);

        fract = new Fraction({
            ...defaultProps,
            values: [
                {id: 'a', value: [-1, 0.5, 10.11] , type: 4},
            ]
        });

        val = fract.processNode();
        expect(isCloseToVal(val.value[0], 0)).toBe(true);
        expect(isCloseToVal(val.value[1], 0.5)).toBe(true);
        expect(isCloseToVal(val.value[2], 0.11)).toBe(true);
    });

    it("math/cosh", () => {
        let cosh: HyperbolicCosine = new HyperbolicCosine({
            ...defaultProps,
            values: [
                { id: 'a', value: 2.0, type: 2 },
            ]
        });

        let val = cosh.processNode();
        expect(isCloseToVal(val.value, Math.cosh(2.0))).toBe(true);

        cosh = new HyperbolicCosine({
            ...defaultProps,
            values: [
                { id: 'a', value: [1, 0, 0.5], type: 4 }
            ]
        });

        val = cosh.processNode();
        expect(isCloseToVal(val.value[0], Math.cosh(1))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.cosh(0))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.cosh(0.5))).toBe(true);
    });

    it("math/sinh", () => {
        let sinh: HyperbolicSine = new HyperbolicSine({
            ...defaultProps,
            values: [
                { id: 'a', value: 2.0, type: 2 },
            ]
        });

        let val = sinh.processNode();
        expect(isCloseToVal(val.value, Math.sinh(2.0))).toBe(true);

        sinh = new HyperbolicSine({
            ...defaultProps,
            values: [
                { id: 'a', value: [1, 0, 0.5], type: 4 }
            ]
        });

        val = sinh.processNode();
        expect(isCloseToVal(val.value[0], Math.sinh(1))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.sinh(0))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.sinh(0.5))).toBe(true);
    });

    it("math/tanh", () => {
        let tanh: HyperbolicTangent = new HyperbolicTangent({
            ...defaultProps,
            values: [
                { id: 'a', value: 2.0, type: 2 },
            ]
        });

        let val = tanh.processNode();
        expect(isCloseToVal(val.value, Math.tanh(2.0))).toBe(true);

        tanh = new HyperbolicTangent({
            ...defaultProps,
            values: [
                { id: 'a', value: [1, 0, 0.5], type: 4 }
            ]
        });

        val = tanh.processNode();
        expect(isCloseToVal(val.value[0], Math.tanh(1))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.tanh(0))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.tanh(0.5))).toBe(true);
    });

    it("math/acosh", () => {
        let acosh: InverseHyperbolicCosine = new InverseHyperbolicCosine({
            ...defaultProps,
            values: [
                { id: 'a', value: 2.0, type: 2 },
            ]
        });

        let val = acosh.processNode();
        expect(isCloseToVal(val.value, Math.acosh(2.0))).toBe(true);

        acosh = new InverseHyperbolicCosine({
            ...defaultProps,
            values: [
                { id: 'a', value: [1, 2, 3], type: 4 }
            ]
        });

        val = acosh.processNode();
        expect(isCloseToVal(val.value[0], Math.acosh(1))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.acosh(2))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.acosh(3))).toBe(true);
    });

    it("math/asinh", () => {
        let asinh: InverseHyperbolicSine = new InverseHyperbolicSine({
            ...defaultProps,
            values: [
                { id: 'a', value: 2.0, type: 2 },
            ]
        });

        let val = asinh.processNode();
        expect(isCloseToVal(val.value, Math.asinh(2.0))).toBe(true);

        asinh = new InverseHyperbolicSine({
            ...defaultProps,
            values: [
                { id: 'a', value: [1, 2, 3], type: 4 }
            ]
        });

        val = asinh.processNode();
        expect(isCloseToVal(val.value[0], Math.asinh(1))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.asinh(2))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.asinh(3))).toBe(true);
    });

    it("math/atanh", () => {
        let atanh: InverseHyperbolicTangent = new InverseHyperbolicTangent({
            ...defaultProps,
            values: [
                { id: 'a', value: 0.5, type: 2 },
            ]
        });

        let val = atanh.processNode();
        expect(isCloseToVal(val.value, Math.atanh(0.5))).toBe(true);

        atanh = new InverseHyperbolicTangent({
            ...defaultProps,
            values: [
                { id: 'a', value: [0.8, 0.2, 0.4], type: 4 }
            ]
        });

        val = atanh.processNode();
        expect(isCloseToVal(val.value[0], Math.atanh(0.8))).toBe(true);
        expect(isCloseToVal(val.value[1], Math.atanh(0.2))).toBe(true);
        expect(isCloseToVal(val.value[2], Math.atanh(0.4))).toBe(true);
    });

    it("math/normalize", () => {
        const normalize: Normalize = new Normalize({
            ...defaultProps,
            values: [
                { id: 'a', value: [3.0, 4.0, 5.0], type: 4 },
            ]
        });

        const normalizedVector = normalize.processNode();

        const vecLen = Math.sqrt(3**2 + 4**2 + 5**2);

        expect(isCloseToVal(normalizedVector.value[0], 3/vecLen)).toBe(true);
        expect(isCloseToVal(normalizedVector.value[1], 4/vecLen)).toBe(true);
        expect(isCloseToVal(normalizedVector.value[2], 5/vecLen)).toBe(true);
    });

    it("math/length", () => {
        const vectorLen: VectorLength = new VectorLength({
            ...defaultProps,
            values: [
                { id: 'a', value: [3.0, 4.0, 5.0], type: 4 },
            ]
        });

        const val = vectorLen.processNode();

        const expectedVecLen = Math.sqrt(3**2 + 4**2 + 5**2);

        expect(isCloseToVal(val.value, expectedVecLen)).toBe(true);
    });

    it("math/dot", () => {
        const dot = new Dot({
            ...defaultProps,
            values: [
                {id: 'a', value: [-10.5, 0.5, 9] , type: 4},
                {id: 'b', value: [4, -6, 10] , type: 4}
            ]
        });

        const val = dot.processNode();
        const expected = -10.5 * 4 + 0.5 * -6 + 9 * 10
        expect(val.value).toBe(expected);
    });

    it("math/cross", () => {
        const cross: Cross = new Cross({
            ...defaultProps,
            values: [
                { id: 'a', value: [2.0, 1.0, 3.0], type: 4 },
                { id: 'b', value: [4.0, -2.0, 1.0], type: 4 }
            ]
        });

        const val = cross.processNode().value;

        const expected = [
            1.0 * 1.0 - 3.0 * -2.0,
            3.0 * 4.0 - 2.0 * 1.0,
            2.0 * -2.0 - 1.0 * 4.0
        ];

        expect(expected[0]).toEqual(val[0]);
        expect(expected[1]).toEqual(val[1]);
        expect(expected[2]).toEqual(val[2]);
    });

    it("math/Rotated3D", () => {
        const rotate3D: Rotate3D = new Rotate3D({
            ...defaultProps,
            values: [
                { id: 'a', value: [1.0, 0.0, 0.0], type: 4 },
                { id: 'b', value: [0.0, 1.0, 0.0], type: 4 },
                { id: 'c', value: Math.PI / 2, type: 2 },
            ]
        });

        const val = rotate3D.processNode().value;

        // Calculate the expected result manually
        const cos_theta = Math.cos(Math.PI / 2);
        const sin_theta = Math.sin(Math.PI / 2);

        const a = [1.0, 0.0, 0.0];
        const b = [0.0, 1.0, 0.0];

        const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        const parallelCoeff = dot * (1 - cos_theta);
        const parallel = [
            b[0] * parallelCoeff,
            b[1] * parallelCoeff,
            b[2] * parallelCoeff
        ];
        const perpendicular = [
            (a[0] - dot * b[0]) * sin_theta,
            (a[1] - dot * b[1]) * sin_theta,
            (a[2] - dot * b[2]) * sin_theta
        ];
        const expected = [
            a[0] * cos_theta + perpendicular[0] + parallel[0],
            a[1] * cos_theta + perpendicular[1] + parallel[1],
            a[2] * cos_theta + perpendicular[2] + parallel[2],
        ];

        expect(expected[0]).toEqual(val[0]);
        expect(expected[1]).toEqual(val[1]);
        expect(expected[2]).toEqual(val[2]);
    });
});

const isCloseToVal = (actual: number, expected: number): boolean => {
    return Math.abs(actual - expected) < 0.000001;
}