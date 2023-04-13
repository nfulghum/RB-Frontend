import React, { useState } from 'react';
import ResolutionApi from '../../api';
import MealCard from './MealCard';
import {
    Button,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    CssBaseline,
    MenuItem
} from '@mui/material';


const Meal = () => {

    const [mealData, setMealData] = useState(null);
    const [formData, setFormData] = useState({
        calories: "",
        diet: "",
        exclude: "",
    })

    const diets = [
        {
            value: "Gluten Free",
            label: "Gluten Free"
        },
        {
            value: "Whole 30",
            label: "Whole 30"
        },
        {
            value: "Vegan",
            label: "Vegan"
        },
        {
            value: "Vegetarian",
            label: "Vegetarian"
        },
        {
            value: "Pescetarian",
            label: "Pescetarian"
        },
        {
            value: "Primal",
            label: "Primal"
        },
        {
            value: "Paleo",
            label: "Paleo"
        }
    ]


    async function getMealPlan(e) {
        e.preventDefault();
        let mealData = await ResolutionApi.generateMealPlan(formData);
        setMealData(mealData);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography component='h1' variant='h5' color='#DD5F18'>
                    Generate Meal Plan
                </Typography>
                <form onSubmit={getMealPlan}>
                    <Box noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="calories"
                                    fullWidth
                                    id="calories"
                                    label="Calories (e.g. 2000)"
                                    autoFocus
                                    value={formData.calories}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="diet"
                                    select
                                    name="diet"
                                    label="Select Diet"
                                    onChange={handleChange}
                                >
                                    {diets.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="exclude"
                                    label="Exclude"
                                    name="exclude"
                                    value={formData.exclude}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onSubmit={getMealPlan}
                            sx={{ mt: 3, mb: 2 }}
                            style={{ background: '#093D65' }}
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
            {mealData && <MealCard mealData={mealData} />}
        </Container>
    )
}

export default Meal;