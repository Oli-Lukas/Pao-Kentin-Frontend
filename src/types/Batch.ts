import { Bread } from "./Bread";

export type Batch = {
  id        : number;
  bread     : Bread;
  startTime : Date;
  endTime   : Date;
};