import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { DataGridPro, LicenseInfo } from '@mui/x-data-grid-pro';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Slider from '@mui/material/Slider';
import { CustomSlider } from './CustomSlider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

var _ = require('lodash');

const Home = (props) => {

    LicenseInfo.setLicenseKey(
        process.env.REACT_APP_MATERIAL_LICENSE_KEY,
    );

    ChartJS.register(
        zoomPlugin,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
    );

    const options = {
        maintainAspectRatio: true,
        responsive: true,
        interaction: {
            intersect: false,
        },
        events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Compound interest effect of CDA among local banks (age < 13) and PSEA account (age >= 13) until the age 21',
            },
            tooltip: {
                mode: 'index',
                events: ['click', 'touchmove', 'touchstart']
            },
            zoom: {
                zoom: {
                  wheel: {
                    enabled: true // SET SCROOL ZOOM TO TRUE
                  },
                  mode: "xy",
                  speed: 1,
                },
                pan: {
                  enabled: true,
                  mode: "xy",
                  speed: 1,
                }
            }
        },
    };

    const defaultDateRange = _.range(new Date().getFullYear(), new Date().getFullYear() + 21).map((eachYear) => eachYear.toString())
    const [chartData, setChartData] = useState({
        labels: defaultDateRange,
        datasets: [
            {
                label: 'POSB',
                data: defaultDateRange.map(() => 0),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'UOB',
                data: defaultDateRange.map(() => 0),
                borderColor: 'rgb(0, 40, 74)',
                backgroundColor: 'rgba(0, 40, 74, 0.5)',
            },
            {
                label: 'OCBC',
                data: defaultDateRange.map(() => 0),
                borderColor: 'rgb(246, 3, 3)',
                backgroundColor: 'rgba(246, 3, 3, 0.5)',
            },
        ],
    });

    const [accountAmount, setAccountAmount] = useState(0);
    const [year, setYear] = useState(new Date());
    const [yearRange, setYearRange] = useState(defaultDateRange);

    const [amountChangDelay, setAmountChangDelay] = useState(false);

    const handleAmountChangeDelay = () => {
        if (!amountChangDelay) {
            setAmountChangDelay(true)
            setTimeout(() => {
                const yearValue = year.getFullYear()
                const childAge = new Date().getFullYear() - yearValue
                const {posb, uob, ocbc} = handleCompoundEffect(accountAmount, yearRange, childAge)
                setChartData({
                    labels: yearRange,
                    datasets: [
                        {
                            label: 'POSB',
                            data: posb,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                        {
                            label: 'UOB',
                            data: uob,
                            borderColor: 'rgb(0, 40, 74)',
                            backgroundColor: 'rgba(0, 40, 74, 0.5)',
                        },
                        {
                            label: 'OCBC',
                            data: ocbc,
                            borderColor: 'rgb(246, 3, 3)',
                            backgroundColor: 'rgba(246, 3, 3, 0.5)',
                        },
                    ],
                })
                setAmountChangDelay(false)
            }, 1500);
        }
    }

    useEffect(() => {
        handleAmountChangeDelay()
    },[accountAmount])

    function sliderValueText(value) {
        setAccountAmount(value)
        // set slider value
        value = value.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(value))
            value = value.replace(pattern, "$1,$2");
        return `$${value}`;
        // return `${value}°C`;
    }

    const handleCompoundEffect = (amountAtYearZero, yearRangeArray, childAge) => {
        let currentChildAge = childAge
        let posb = [amountAtYearZero]
        let ocbc = [amountAtYearZero]
        let uob = [amountAtYearZero]
        yearRangeArray.map((eachYear) => {
            if (currentChildAge >= 13) {
                // PSEA ACCOUNT INTEREST
                posb.push(posb[posb.length - 1] * 1.025)
                ocbc.push(ocbc[ocbc.length - 1] * 1.025)
                uob.push(uob[uob.length - 1] * 1.025)
            } else {
                let posbLastAmount = posb[posb.length - 1]
                let ocbcLastAmount = ocbc[ocbc.length - 1]
                let uobLastAmount = uob[uob.length - 1]

                // POSB
                if (posbLastAmount <= 10000) {
                    posb.push(posb[posb.length - 1] * 1.01)
                } else {
                    let posbFirst10k = posbLastAmount >= 10000 ? 10000 : posbLastAmount
                    let posbNext40k = (posbLastAmount - posbFirst10k) >= 40000 ? 40000 : (posbLastAmount - posbFirst10k)
                    let posbAfter50k = posbNext40k === 40000 ? posbLastAmount - 50000 : 0
                    if (posbAfter50k < 0) posbAfter50k = 0
                    let newPosbAmount = (posbFirst10k * 1.01) + (posbNext40k * 1.02) + (posbAfter50k * 1.005)
                    posb.push(newPosbAmount)
                }

                // OCBC
                if (ocbcLastAmount <= 10000) {
                    ocbc.push(ocbc[ocbc.length - 1] * 1.012)
                } else {
                    let ocbcFirst10k = ocbcLastAmount >= 10000 ? 10000 : ocbcLastAmount
                    let amountAfter10k = ocbcLastAmount - 10000
                    let newOcbcAmount = (ocbcFirst10k * 1.012) + (amountAfter10k * 1.024)
                    ocbc.push(newOcbcAmount)
                }

                // UOB
                if (uobLastAmount <= 25000) {
                    uob.push(uob[uob.length - 1] * 1.01)
                } else {
                    let uobFirst25k = uobLastAmount >= 25000 ? 25000 : uobLastAmount
                    let uobNext25k = (uobLastAmount - uobFirst25k) >= 25000 ? 25000 : (uobLastAmount - uobFirst25k)
                    let uobAfter50k = uobNext25k === 25000 ? uobLastAmount - 50000 : 0
                    if (uobAfter50k < 0) uobAfter50k = 0
                    let newPosbAmount = (uobFirst25k * 1.01) + (uobNext25k * 1.02) + (uobAfter50k * 1.005)
                    uob.push(newPosbAmount)
                }
            }
            currentChildAge = currentChildAge + 1
        })
        return {posb, uob, ocbc}
    }

    const handleYearChange = (newValue) => {
        setYear(newValue);
        // const defaultDateRange = _.range(new Date().getFullYear(), new Date().getFullYear() + 31).map((eachYear) => eachYear.toString())
        const yearValue = newValue.getFullYear()
        // console.log("yearValue: ", yearValue);
        const childAge = new Date().getFullYear() - yearValue
        // console.log("childAge: ", childAge);
        const labelMaxRange = 21 - childAge // because PSEA account is only until age 31
        // console.log("labelMaxRange: ", labelMaxRange);
        // console.log("yearValue + labelMaxRange :", yearValue + labelMaxRange);
        let XlabelAgeRange = _.range(new Date().getFullYear(), yearValue + labelMaxRange + 1).map((eachYear) => eachYear.toString())
        setYearRange(XlabelAgeRange)
        const {posb, uob, ocbc} = handleCompoundEffect(accountAmount, XlabelAgeRange, childAge)
        setChartData({
            labels: XlabelAgeRange,
            datasets: [
                {
                    label: 'POSB',
                    data: posb,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: 'UOB',
                    data: uob,
                    borderColor: 'rgb(0, 40, 74)',
                    backgroundColor: 'rgba(0, 40, 74, 0.5)',
                },
                {
                    label: 'OCBC',
                    data: ocbc,
                    borderColor: 'rgb(246, 3, 3)',
                    backgroundColor: 'rgba(246, 3, 3, 0.5)',
                },
            ],
        })
    }

    const amountMarks = [
        {
          value: 9000,
          label: '$9k',
        },
        {
          value: 15000,
          label: '$15k',
        },
        {
          value: 21000,
          label: '$21k',
        },
        {
          value: 33000,
          label: '$33k',
        },
    ];

    return (
        <Container maxWidth="xl" >
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Box m={2} variant="middle" >
                    <Typography variant="h5">CHILD DEVELOPMENT ACCOUNT (CDA)</Typography>
                </Box>
            </Slide>
            {/* HOW IT WORKS */}
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Box m={2} variant="middle" >
                    {/* Accordion */}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography><b>HOW CDA WORKS</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid 
                                container 
                                justify="center" 
                                alignContent="center" 
                                alignItems="center" 
                                direction="row"
                            >
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography>
                                        From your child's birth right up till the end of their 12th year, enjoy savings matched dollar-to-dollar from the government, so you get to earn the most for your child.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <br/>
                                    <DataGridPro
                                        rows={[
                                            { id: "1",childOrder: "1st", govFirstStepGrant: "SGD $3,000", govD4DMatching: "SGD $3,000", maxCDABenefit: "SGD $6,000" },
                                            { id: "2",childOrder: "2nd", govFirstStepGrant: "SGD $3,000", govD4DMatching: "SGD $6,000", maxCDABenefit: "SGD $9,000" },
                                            { id: "3n4",childOrder: "3rd & 4th", govFirstStepGrant: "SGD $3,000", govD4DMatching: "SGD $9,000", maxCDABenefit: "SGD $12,000" },
                                            { id: "5up",childOrder: "5th & beyond", govFirstStepGrant: "SGD $,3000", govD4DMatching: "SGD $15,000", maxCDABenefit: "SGD $18,000" },
                                        ]}
                                        columns={[
                                            {
                                                field: 'childOrder',
                                                headerName: 'Child Order',
                                                flex: 1,
                                                minWidth: 100
                                            },
                                            {
                                                field: 'govFirstStepGrant',
                                                headerName: 'Government First Step Grant',
                                                flex: 1,
                                                minWidth: 200
                                            },
                                            {
                                                field: 'govD4DMatching',
                                                headerName: 'Government dollar-for-dollar matching',
                                                flex: 1,
                                                minWidth: 270
                                            },
                                            {
                                                field: 'maxCDABenefit',
                                                headerName: 'Total CDA Benefit',
                                                flex: 1,
                                                minWidth: 180
                                            },
                                        ]}
                                        disableSelectionOnClick
                                        autoHeight
                                        rowsPerPageOptions={[]}
                                        hideFooterPagination
                                        hideFooterRowCount
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <br/>
                                    <Typography>
                                        Government First Step Grant + Government dollar-for-dollar matching = Total CDA Benefit
                                    </Typography>
                                    <br/>
                                    <Typography>
                                        CDA funds can only be used at approved institutions. When your child turns 13, the unspent balance goes to their Post Secondary Education Account (PSEA), making it easier to pay education fees.
                                    </Typography>
                                    <br/>
                                    <Typography>
                                        *The Government will increase its dollar-for-dollar matching cap from S$3,000 to S$6,000 for all Singaporean children who are a second child and whose date of birth or estimated date of delivery is on or after 1 January 2021. This will take effect from 1 April 2021. Parents whose children qualify and had saved into their child’s CDA before 1 April 2021, will also receive the increased co-matching.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Slide>
            {/* Graph Title */}
            {/* YEAR OF BIRTH */}
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Box m={2} variant="middle" >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Child Birth Year"
                            views={['year']}
                            value={year}
                            onChange={(newValue) => {
                                handleYearChange(newValue)
                            }}
                            minDate={new Date('2000-01-01')}
                            maxDate={new Date('2050-01-01')}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
            </Slide>
            {/* AMOUNT */}
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Box m={2} variant="middle" >
                    <CustomSlider
                        valueLabelDisplay="auto"
                        aria-label="Amount"
                        defaultValue={20}
                        valueLabelFormat={sliderValueText}
                        max={50000}
                        marks={amountMarks}
                    />
                </Box>
            </Slide>
            {/* LINE GRAPH */}
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Box m={2} variant="middle" >
                    <Line options={options} data={chartData} />
                </Box>
            </Slide>

        </Container>
    )
}

export default Home