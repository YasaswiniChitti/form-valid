"use client";
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const schema = yup.object().shape({
  firstname: yup
    .string()
    .required("First Name is required")
    .matches(/^[A-Za-z ]*$/, "First Name will accept only characters"),
  lastname: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Last Name will accept only characters")
    .required("Last Name is required"),
  username: yup
    .string()
    .matches(/^[A-Za-z0-9 ]*$/, "Username will accept only letters and digits")
    .required("Username is required"),
  email: yup
    .string()
    .email()
    .required("please provide the valid email address"),
  address: yup
    .string()
    .matches(
      /^[A-Za-z0-9 ]*$/,
      "Address should contain letters,digits and spaces"
    )
    .required("Address is required"),
  country: yup.string().required("Choose one of the options in the dropdown"),
  zip: yup
    .string()
    .matches(/^[0-9]{7}$/, "postal code must contain 7 digits")
    .required("Postal code is required"),
  cardname: yup
    .string()
    .required("cardname is required")
    .min(5, "Expecting minimum of 5 letters"),
  cardnumber: yup
    .string()
    .matches(/^[0-9]{16}$/, "Card must have 16 numbers")
    .required("cardnumber is required"),
  expiry: yup
    .string()
    .matches(/([0-9]{2})\/([0-9]{2})/, "Not a valid expiration date")
    .required("please enter the valid formate"),
  CVV: yup
    .string()
    .matches(/^[0-9]{3}$/, "numbers should not exceed 3 digits")
    .required("CVV is required"),
});

export default function Home() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    address: "",
    country: "",
    zip: "",
    cardname: "",
    cardnumber: "",
    expiry: "",
    CVV: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
    setLoading(true);
    axios
      .post("http://localhost:3005/billing", data)
      .then((response) => {
        console.log(response.data);
        toast.success("Order placed successfully");
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  };
  const handleError = (error: any) => {
    console.log(error);
    toast.error("Error while submission");
  };
  return (
    <>
      <Container maxWidth="lg">
        <Grid container sx={{ mb: 4 }} display="flex" justifyContent="center">
          <Grid item xs={6} sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Billing Address
            </Typography>
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <FormControl fullWidth>
                <Grid container sx={{ mb: 4 }} spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      autoFocus
                      fullWidth
                      label="First Name"
                      placeholder="John"
                      {...register("firstname")}
                      error={Boolean(errors.firstname)}
                      helperText=<>{errors.firstname?.message}</>
                    ></TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      placeholder="Deo"
                      {...register("lastname")}
                      error={Boolean(errors.lastname)}
                      helperText=<>{errors.lastname?.message}</>
                    ></TextField>
                  </Grid>
                </Grid>
                <TextField
                  label="Username"
                  placeholder="Username"
                  sx={{ mb: 4 }}
                  {...register("username")}
                  error={Boolean(errors.username)}
                  helperText=<>{errors.username?.message}</>
                ></TextField>
                <TextField
                  label="Email"
                  placeholder="you@example.com"
                  sx={{ mb: 4 }}
                  {...register("email")}
                  error={Boolean(errors.email)}
                  helperText=<>{errors.email?.message}</>
                ></TextField>
                <TextField
                  label="Address"
                  placeholder="1234 Main str"
                  sx={{ mb: 4 }}
                  {...register("address")}
                  error={Boolean(errors.address)}
                  helperText=<>{errors.address?.message}</>
                ></TextField>
                <TextField
                  label="Address2"
                  placeholder="Appartment or suite"
                  sx={{ mb: 4 }}
                ></TextField>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      select
                      label="Country"
                      {...register("country")}
                      error={Boolean(errors.country)}
                      helperText=<>{errors.country?.message}</>
                    >
                      <MenuItem value="">Choose one option</MenuItem>
                      <MenuItem value="India">IN</MenuItem>
                      <MenuItem value="Austaila">AU</MenuItem>
                      <MenuItem value="Europe">EU</MenuItem>
                    </TextField>
                    {/* <FormControl fullWidth>
                      <InputLabel>Country</InputLabel>
                      <Select label="Country">
                        <MenuItem value="">Choose</MenuItem>
                        <MenuItem value="India">IN</MenuItem>
                        <MenuItem value="Australia">AU</MenuItem>
                        <MenuItem value="Europe">EU</MenuItem>
                      </Select>
                    </FormControl> */}
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>State</InputLabel>
                      <Select label="state">
                        <MenuItem value="">Choose</MenuItem>
                        <MenuItem value="Andhra Pradesh">
                          Andhra Pradesh
                        </MenuItem>
                        <MenuItem value="Telangana">TE</MenuItem>
                        <MenuItem value="Karnataka">KA</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Zip"
                      {...register("zip")}
                      error={Boolean(errors.zip)}
                      helperText=<>{errors.zip?.message}</>
                    ></TextField>
                  </Grid>
                </Grid>
              </FormControl>
              <FormControlLabel
                control={<Checkbox />}
                label="Shipping address is the same as my billing address"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Save this information for next time"
                sx={{ mb: 4 }}
              />
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6">Payment</Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="credit card"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="credit card"
                    control={<Radio />}
                    label="Credit Card"
                  />
                  <FormControlLabel
                    value="Debit card"
                    control={<Radio />}
                    label="Debit Card"
                  />
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label="Paypal"
                  />
                </RadioGroup>
              </FormControl>
              <Grid container sx={{ mb: 4 }} spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Name on the card"
                    {...register("cardname")}
                    error={Boolean(errors.cardname)}
                    helperText=<>{errors.cardname?.message}</>
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Credit card number"
                    {...register("cardnumber")}
                    error={Boolean(errors.cardnumber)}
                    helperText=<>{errors.cardnumber?.message}</>
                  ></TextField>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Expiration"
                    {...register("expiry")}
                    error={Boolean(errors.expiry)}
                    helperText=<>{errors.expiry?.message}</>
                  ></TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="CVV"
                    {...register("CVV")}
                    error={Boolean(errors.CVV)}
                    helperText=<>{errors.CVV?.message}</>
                  ></TextField>
                </Grid>
              </Grid>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={loading}
              >
                Continue to checkout
              </LoadingButton>
            </form>
          </Grid>
          <Grid item xs={6} px={4} sx={{ p: 4 }}>
            <Box sx={{ width: "100%", maxWidth: 360 }}>
              <Box sx={{ mx: 2 }}>
                <Grid container alignItems="flex-start" sx={{ mb: 2 }}>
                  <Grid item xs={6} md={10}>
                    <Typography variant="h6" color="text.disabled">
                      Your cart
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Badge color="secondary" badgeContent={3} />
                  </Grid>
                </Grid>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <Grid container alignItems="flex-start">
                    <Grid item xs={8} sx={{ mx: 2 }}>
                      <Typography variant="subtitle1" color="text.primary">
                        Product name
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography
                        variant="body1"
                        color="text.disabled"
                        sx={{ mx: 3 }}
                      >
                        $12
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                        sx={{ mx: 2, mb: 1 }}
                      >
                        Brief description
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container alignItems="flex-start">
                    <Grid item xs={8} sx={{ mx: 2 }}>
                      <Typography variant="subtitle1" color="text.primary">
                        second product
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="text.disabled"
                        sx={{ mx: 3 }}
                      >
                        $8
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ mx: 2, mb: 1 }}
                  >
                    Brief description
                  </Typography>
                  <Divider />
                  <Grid container alignItems="flex-start">
                    <Grid item xs={8} sx={{ mx: 2 }}>
                      <Typography variant="subtitle1" color="text.primary">
                        third item
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="text.disabled"
                        sx={{ mx: 3 }}
                      >
                        $5
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ mx: 2, mb: 1 }}
                  >
                    Brief description
                  </Typography>
                  <Divider />
                  <Grid container alignItems="flex-start">
                    <Grid item xs={8} sx={{ mx: 2 }}>
                      <Typography variant="subtitle1" color="green">
                        Promo code
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" color="00FF00" sx={{ mx: 3 }}>
                        -$5
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography
                    color="00FF00"
                    variant="body2"
                    sx={{ mx: 2, mb: 1 }}
                  >
                    EXAMPLECODE
                  </Typography>
                  <Divider />
                  <Grid container alignItems="flex-start">
                    <Grid item xs={8} sx={{ mx: 2, mb: 1 }}>
                      <Typography variant="subtitle1" color="text.primary">
                        Total (USD)
                      </Typography>
                    </Grid>
                    <Grid item sx={{ mx: 3 }}>
                      <Typography variant="body1" color="text.disabled">
                        $20
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
                <FormControl>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Redeem
                  </InputLabel>
                  <OutlinedInput
                    endAdornment={
                      <InputAdornment position="end">
                        <Button fullWidth variant="contained" color="primary">
                          Redeem
                        </Button>
                      </InputAdornment>
                    }
                    label="Redeem"
                  ></OutlinedInput>
                </FormControl>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Toaster position="top-right" />
    </>
  );
}
function register(arg0: string): React.JSX.IntrinsicAttributes & {
  variant?: import("@mui/material").TextFieldVariants | undefined;
} & Omit<
    | import("@mui/material").OutlinedTextFieldProps
    | import("@mui/material").FilledTextFieldProps
    | import("@mui/material").StandardTextFieldProps,
    "variant"
  > {
  throw new Error("Function not implemented.");
}
