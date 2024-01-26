import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "datePie",
})
export class DatePiePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
