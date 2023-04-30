import type { FunctionFragment, Interface } from '@ethersproject/abi';
import type { CallResult, CallState } from '../types';
export declare function useCallStates(results: CallResult[], contractInterface: Interface | undefined, fragment: ((i: number) => FunctionFragment | undefined) | FunctionFragment | undefined, latestBlockNumber: number | undefined): CallState[];
export declare function toCallState(callResult: CallResult | undefined, contractInterface: Interface | undefined, fragment: FunctionFragment | undefined, syncingBlockNumber: number | undefined): CallState;
