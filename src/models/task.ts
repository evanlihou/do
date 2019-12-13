import * as moment from "moment";

export class Task {
  public taskId: Number;
  public what: string;
  public when: Date;
  public complete: boolean;
  public momentWhen: moment.Moment;
}

export var TaskDbModel = {
  name: "todos",
  model: {
    "taskId:int": { pk: true, ai: true },
    "what:safestr": {},
    "when:safestr": {},
    "complete:boolean": {}
  }
};
