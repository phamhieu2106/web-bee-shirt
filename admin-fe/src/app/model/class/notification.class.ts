export class Notification {
  id: number;
  message: string;
  status: boolean;
  time: Date;

  constructor(id: number, message: string) {
    this.id = id;
    this.message = message;
  }
}
