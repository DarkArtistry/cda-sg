import React from 'react'
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

const Home = (props) => {

    LicenseInfo.setLicenseKey(
        process.env.REACT_APP_MATERIAL_LICENSE_KEY,
    );

    return (
        <Container maxWidth="xl" >
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Box m={2} variant="middle" >
                    <Typography variant="h5">CHILD DEVELOPMENT ACCOUNT (CDA)</Typography>
                </Box>
            </Slide>
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
        </Container>
    )
}

export default Home