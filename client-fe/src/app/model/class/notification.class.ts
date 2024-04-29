export class Notification {
  id: number;
  type: string;
  read: boolean;
  content: string;
  relatedUrl: string;
  time: Date;
  custId: number;

  constructor(
    type: string,
    content: string,
    relatedUrl: string,
    custId: number
  ) {
    this.type = type;
    this.content = content;
    this.relatedUrl = relatedUrl;
    this.custId = custId;
  }
}
