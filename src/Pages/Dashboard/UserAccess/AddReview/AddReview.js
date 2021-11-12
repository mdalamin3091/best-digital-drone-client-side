import React from 'react'
import {Container, Paper, Box, TextField, Button} from "@mui/material";
import useAuth from "../../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddReview = () => {
    const {currentUser} = useAuth();
    const { register, handleSubmit, errors, reset } = useForm();
    const onSubmit = (data) => {
        axios.post(`http://localhost:5000/review`, data).then((res) => {
            if (res.data.acknowledged) {
              alert("Thanks for your valuable feedback");
              reset();
            }
          });
    };
    return (
        <Container>
            <Paper component={Box} elevation ={4} p={4} sx={{width:"70%", mx:"auto"}}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="dense"
              defaultValue={currentUser?.displayName}
              label="Name"
              type="text"
              fullWidth
              variant="filled"
              required
              {...register("name", { required: true })}
            />
            <TextField
              margin="dense"
              label="Rating Number"
              type="number"
              helperText="Maximum 5 Rating you can"
              fullWidth
              variant="filled"
              required
              {...register("rating", { required: true, maxLength:5 })}
            />
            <TextField
              margin="dense"
              label="Write your product review"
              type="text"
              fullWidth
              multiline
              rows={5}
              variant="filled"
              required
              {...register("reviewText", { required: true })}
            />
            <Button type="submit" variant="contained">
                send
            </Button>
            </Box>
            </Paper>
        </Container>
    )
}

export default AddReview;