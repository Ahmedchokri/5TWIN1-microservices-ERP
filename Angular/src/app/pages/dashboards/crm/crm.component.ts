import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

import { statData, DealsStatus, UpcomingActivities, ClosingDeals } from './data';

@Component({
    selector: 'app-crm',
    templateUrl: './crm.component.html',
    styleUrls: ['./crm.component.scss']
})

/**
 * Crm Dashboard Component
 */
export class CrmComponent implements OnInit {

    FunnelChart: any;
    PieChartLead: any;
    PieChartOpp: any;



    num: Number = 5;

    countLead: Array<any> = new Array();

    countContact: Array<any> = new Array();

    countOppsWon: Array<any> = new Array();

    countOppsLost: Array<any> = new Array();

    countOppsPending: Array<any> = new Array();

    countAmountWon: Array<any> = new Array();

    countAmountAll: Array<any> = new Array();

    countAmountPending: Array<any> = new Array();

    LeadsByStatus: Array<any> = new Array();

    LeadsStatus: Array<any> = new Array();

    OppsByStatus: Array<any> = new Array();

    oppsStatus: Array<any> = new Array();


    years: Array<any> = new Array();

    max: any = 10;

    counttn: any;
    countfr: any;
    countde: any;

    pourcentageTn: Number = 0;
    pourcentageFr: any;
    pourcentageDe: any;

    anualProfit: any;
    dailyProfit: any;

    countOpps: any;




    // bread crumb items
    breadCrumbItems!: Array<{}>;
    statData!: any;
    salesForecastChart: any;
    DealTypeChart: any;
    splineAreaChart: any;
    DealsStatus: any;
    UpcomingActivities: any;
    ClosingDeals: any;

    OverviewChart: any;

    sales: Number = 0;



    leads: any;
    contacts: any;
    accounts: any;
    leadsConversionPourcentage: any;


    constructor(private dashboardService: DashboardService) { }

    ngOnInit(): void {



        this.countLeadsByMonth()
        this.countContactsByMonth()

        this.countOppsWonByYear()
        this.countOppsLostByYear()
        this.countOppsPendingByYear()



        this.countAmountAllThisYear()
        this.countAmountWonThisYear()
        this.countAmountPendingThisYear()

        this.oppByCountry()

        this.countOpp()

        this.countLeadsByStatus()

        this.oppsByStatus()

        setTimeout(() => document.getElementById('tn')!.setAttribute("style", "width: " + this.pourcentageTn + "%"), 2000);
        setTimeout(() => document.getElementById('fr')!.setAttribute("style", "width: " + this.pourcentageFr + "%"), 2000);
        setTimeout(() => document.getElementById('de')!.setAttribute("style", "width: " + this.pourcentageDe + "%"), 2000);


        this.leadsCount()
        this.contactsCount()
        this.accountsCount()
        setTimeout(() => this.leadsConversion(), 1500)

        this._splineAreaChart('["--vz-success", "--vz-danger"]');
        /**
         * BreadCrumb
         */
        this.breadCrumbItems = [
            { label: 'Dashboards' },
            { label: 'CRM', active: true }
        ];

        /**
         * Fetches the data
         */
        this.fetchData();

        this.max += Math.max(...this.countLead);




        // Chart Color Data Get Function
        this._salesForecastChart('["--vz-primary", "--vz-success", "--vz-warning"]');
        this._DealTypeChart('["--vz-warning", "--vz-danger", "--vz-success"]');
        setTimeout(() => this._FunnelChart('["--vz-info", "--vz-success", "--vz-warning", "--vz-danger", "--vz-primary"]'), 2000);
        setTimeout(() => this._PieChartOpp('["--vz-success", "--vz-danger" , "--vz-primary", "--vz-warning", "--vz-info", "--vz-dark"]'), 2000);
        setTimeout(() => this._PieChartLead('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'), 2000);


        setTimeout(() => this.anualProfit = "$" + this.countAmountWon + "k", 1500)
        setTimeout(() => this.dailyProfit = "$" + Math.round((Number(this.countAmountWon) * 1000) / 365), 1500)
    }

    countLeadsByStatus() {
        this.dashboardService.leadsCountByStatus().subscribe(
            (data: any) => {
                data.map((res: any) => {
                    this.LeadsByStatus.push(res.count)
                    this.LeadsStatus.push(res._id)
                })
             

                this.countOppsWon.map(i => {
                    console.log(i)
                    this.sales = this.sales + i
                })
            }
        )
    }

    countOpp() {
        this.dashboardService.opportunityCount().subscribe(
            (data: any) => {
                this.countOpps = data;
                this.pourcentageTn = Math.round((this.counttn * 100) / data);
                this.pourcentageFr = Math.round((this.countfr * 100) / data);
                this.pourcentageDe = Math.round((this.countde * 100) / data);
            }
        )
    }
    oppByCountry() {
        this.dashboardService.opportunityByCountry().subscribe(
            (data: any) => {
                this.counttn = data[0].count;
                this.countfr = data[1].count;
                this.countde = data[2].count;
            }
        )
    }


    leadsCount() {
        this.dashboardService.leadsCount().subscribe(
            data => {
                this.leads = data;
            }
        )
    }

    contactsCount() {
        this.dashboardService.contactsCount().subscribe(
            data => {
                this.contacts = data;
            }
        )
    }

    accountsCount() {
        this.dashboardService.accountsCount().subscribe(
            data => {
                this.accounts = data;
            }
        )
    }

    leadsConversion() {
        this.leadsConversionPourcentage = Math.round((this.contacts * 100) / this.leads) + "%"

        statData[2].value = this.leadsConversionPourcentage
    }













    // Chart Colors Set
    private getChartColorsArray(colors: any) {
        colors = JSON.parse(colors);
        return colors.map(function (value: any) {
            var newValue = value.replace(" ", "");
            if (newValue.indexOf(",") === -1) {
                var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
                if (color) {
                    color = color.replace(" ", "");
                    return color;
                }
                else return newValue;;
            } else {
                var val = value.split(',');
                if (val.length == 2) {
                    var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                    rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                    return rgbaColor;
                } else {
                    return newValue;
                }
            }
        });
    }





    countAmountAllThisYear() {
        this.dashboardService.countAmountAllThisYear().subscribe(
            (data: any) => {
                this.countAmountAll.push(data / 1000)
            }
        )
    }
    countAmountWonThisYear() {
        this.dashboardService.countAmountWonThisYear().subscribe(
            (data: any) => {
                this.countAmountWon.push(data / 1000)
            }
        )
    }
    countAmountPendingThisYear() {
        this.dashboardService.countAmountPendingThisYear().subscribe(
            (data: any) => {
                this.countAmountPending.push(data / 1000)
            }
        )
    }



    /**
   * Sales Forecast Charts
   */
    private _salesForecastChart(colors: any) {
        colors = this.getChartColorsArray(colors);
        this.salesForecastChart = {
            series: [{
                name: 'Goal',
                data: this.countAmountAll
            }, {
                name: 'Pending Forcast',
                data: this.countAmountPending
            }, {
                name: 'Revenue',
                data: this.countAmountWon
            }],
            chart: {
                type: 'bar',
                height: 341,
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '65%',
                },
            },
            stroke: {
                show: true,
                width: 5,
                colors: ['transparent']
            },
            xaxis: {
                categories: [''],
                axisTicks: {
                    show: false,
                    borderType: 'solid',
                    color: '#78909C',
                    height: 6,
                    offsetX: 0,
                    offsetY: 0
                },
                title: {
                    text: 'Total Forecasted Value',
                    offsetX: 0,
                    offsetY: -30,
                    style: {
                        color: '#78909C',
                        fontSize: '12px',
                        fontWeight: 400,
                    },
                },
            },
            yaxis: {
                labels: {
                    formatter: function (value: any) {
                        return "$" + value + "k";
                    }
                },
                tickAmount: 4,
                min: 0
            },
            fill: {
                opacity: 1
            },
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                fontWeight: 500,
                offsetX: 0,
                offsetY: -14,
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                markers: {
                    width: 10,
                    height: 10,
                }
            },
            colors: colors
        };
    }

    countOppsWonByYear() {
        this.dashboardService.opportunitiesWonCountByYear().subscribe(
            (data: any) => {
                data.map((i: any) => {
                    this.countOppsWon.push(i.count)
                })
            }
        )
    }
    countOppsLostByYear() {
        this.dashboardService.opportunitiesLostCountByYear().subscribe(
            (data: any) => {
                data.map((i: any) => {
                    this.countOppsLost.push(i.count)
                })
            }
        )
    }
    countOppsPendingByYear() {
        this.dashboardService.opportunitiesPendingCountByYear().subscribe(
            (data: any) => {
                data.map((i: any) => {
                    this.countOppsPending.push(i.count)
                })
            }
        )
    }


    /**
   * Deal Type Chart
   */
    private _DealTypeChart(colors: any) {
        colors = this.getChartColorsArray(colors);
        this.DealTypeChart = {
            series: [{
                name: 'Pending',
                data: this.countOppsPending,
            },
            {
                name: 'Closed Lost',
                data: this.countOppsLost,
            },
            {
                name: 'Closed Won',
                data: this.countOppsWon,
            }
            ],
            chart: {
                height: 350,
                type: 'radar',
                dropShadow: {
                    enabled: true, blur: 1, left: 1, top: 1
                },
                toolbar: {
                    show: false
                },
            },
            stroke: {
                width: 2
            },
            fill: {
                opacity: 0.2
            },
            markers: {
                size: 0
            },
            colors: colors,
            xaxis: {
                categories: ['2017', '2018', '2019', '2020', '2021', '2022']
            }
        };
    }


    countLeadsByMonth() {
        this.dashboardService.leadsCountByMonth().subscribe(
            (data: any) => {
                data.map((i: any) => {
                    //console.log(i)
                    this.countLead.push(i.count)
                })
                //console.log(this.countLead)
                //this.count.push(data.count)
            }
        )
    }

    countContactsByMonth() {
        this.dashboardService.contactsCountByMonth().subscribe(
            (data: any) => {
                data.map((i: any) => {
                    //console.log(i)
                    this.countContact.push(i.count)
                })
                //console.log(this.countContact)
                //this.count.push(data.count)
            }
        )
    }

    /**
   * Splie-Area Chart
   */
    private _splineAreaChart(colors: any) {
        colors = this.getChartColorsArray(colors);
        this.splineAreaChart = {
            series: [{
                name: 'Leads',
                data: this.countLead
            }, {
                name: 'Contatcs',
                data: this.countContact
            }],
            chart: {
                height: 290,
                type: 'area',
                toolbar: 'false',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yaxis: {
                tickAmount: 5,
                min: 0,
                max: this.max
            },
            colors: colors,
            fill: {
                opacity: 0.06,
                type: 'solid'
            }
        };
    }

    /**
     * Fetches the data
     */
    private fetchData() {
        this.statData = statData;
        this.DealsStatus = DealsStatus;
        this.UpcomingActivities = UpcomingActivities;
        this.ClosingDeals = ClosingDeals;
    }



    // FunnelChart
    private _FunnelChart(colors: any) {
        colors = this.getChartColorsArray(colors);
        this.FunnelChart = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}'
            },
            toolbox: {
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            legend: {
                data: ["Leads", "Working", "Appointment", "Converted", "Sales"],
                textStyle: { //The style of the legend text
                    color: '#858d98',
                },
            },
            color: colors,
            series: [{
                triggerLineEvent: false,
                name: 'Funnel',
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside'
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 20
                    }
                },
                data: [{
                    value: this.leads,
                    name: 'Leads'
                },
                {
                    value: this.LeadsByStatus[0],
                    name: "Working"
                },
                {
                    value: this.LeadsByStatus[1],
                    name: "Appointment"
                },
                {
                    value: this.LeadsByStatus[2],
                    name: "Converted"
                },
                {
                    value: this.sales,
                    name: 'Sales'
                }
                ]
            }],
            textStyle: {
                fontFamily: 'Poppins, sans-serif'
            },
        }
    }


    // PieChart
    private _PieChartLead(colors: any) {
        colors = this.getChartColorsArray(colors);
        this.PieChartLead = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                textStyle: { //The style of the legend text
                    color: '#858d98',
                },
            },
            color: colors,
            series: [{
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [{
                    value: this.LeadsByStatus[0],
                    name: this.LeadsStatus[0]
                },
                {
                    value: this.LeadsByStatus[1],
                    name: this.LeadsStatus[1]
                },
                {
                    value: this.LeadsByStatus[2],
                    name: this.LeadsStatus[2]
                },
                {
                    value: this.LeadsByStatus[3],
                    name: this.LeadsStatus[3]
                }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }],
            textStyle: {
                fontFamily: 'Poppins, sans-serif'
            },
        };
    }

    oppsByStatus(){
        this.dashboardService.oppsCountByStatus().subscribe(
            (data: any) => {
                data.map((res: any) => {
                    this.OppsByStatus.push(res.count)
                    this.oppsStatus.push(res._id)
                })
            }
        )
    }

    // PieChart
    private _PieChartOpp(colors: any) {
        colors = this.getChartColorsArray(colors);
        this.PieChartOpp = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                textStyle: { //The style of the legend text
                    color: '#858d98',
                },
            },
            color: colors,
            series: [{
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [{
                    value: this.OppsByStatus[0],
                    name: this.oppsStatus[0]
                },
                {
                    value: this.OppsByStatus[1],
                    name: this.oppsStatus[1]
                },
                {
                    value: this.OppsByStatus[2],
                    name: this.oppsStatus[2]
                },
                {
                    value: this.OppsByStatus[3],
                    name: this.oppsStatus[3]
                },
                {
                    value: this.OppsByStatus[4],
                    name: this.oppsStatus[4]
                },
                {
                    value: this.OppsByStatus[5],
                    name: this.oppsStatus[5]
                }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }],
            textStyle: {
                fontFamily: 'Poppins, sans-serif'
            },
        };
    }

}
