import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import HighchartsMaps from "highcharts/modules/map";
import * as mapData from "../../../../assets/map/vietnam.json";

@Component({
  selector: "app-vietnam-map-chart",
  templateUrl: "./vietnam-map-chart.component.html",
  styleUrls: ["./vietnam-map-chart.component.css"],
})
export class VietnamMapChartComponent implements OnInit {
  chart: any;
  // Prepare demo data
  data = [
    ["vn-3655", 10],
    ["vn-qn", 11],
    ["vn-kh", 12],
    ["vn-tg", 13],
    // Your data here
  ];

  handleCreateChart() {
    HighchartsMaps(Highcharts);

    // Create the chart
    this.chart = Highcharts.mapChart("vietnam-map-container", {
      chart: {
        map: mapData,
      },
      title: {
        text: "Bản Đồ Việt Nam",
      },
      mapNavigation: {
        enabled: true,
      },
      accessibility: {
        description: "Thường được dùng để với màn hình desktop",
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
  ngOnInit() {
    this.handleCreateChart();
  }

  ngOnDestroy(): void {}
}
