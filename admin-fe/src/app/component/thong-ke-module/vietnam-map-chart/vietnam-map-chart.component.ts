import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import HighchartsMaps from "highcharts/modules/map";
import * as mapData from "@highcharts/map-collection/countries/vn/vn-all.geo.json";

@Component({
  selector: "app-vietnam-map-chart",
  templateUrl: "./vietnam-map-chart.component.html",
  styleUrls: ["./vietnam-map-chart.component.css"],
})
export class VietnamMapChartComponent implements OnInit {
  ngOnInit() {
    HighchartsMaps(Highcharts);

    // Prepare demo data
    const data = [
      ["vn-3655", 10],
      ["vn-qn", 11],
      ["vn-kh", 12],
      ["vn-tg", 13],
      // Your data here
    ];

    // Create the chart
    Highcharts.mapChart("vietnam-map-container", {
      chart: {
        map: mapData,
      },
      title: {
        text: "Vietnam Map",
      },
      mapNavigation: {
        enabled: true,
      },
      series: [
        {
          data: [
            ["vn-3655", 10],
            ["vn-qn", 11],
            ["vn-kh", 12],
            ["vn-tg", 13],
            // Add your data here
          ],
          name: "Random data",
          states: {
            hover: {
              color: "#BADA55",
            },
          },
          dataLabels: {
            enabled: true,
            format: "{point.name}",
          },
          mapData: mapData,
        } as Highcharts.SeriesOptionsType,
      ],
    });
  }
}
