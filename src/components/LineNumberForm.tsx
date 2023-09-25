import { Box, Grid, Button, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  lineNumber: number;
};

type LineNumberFormProps = {
  max: number;
  handleLineNumber: (lineNumber: number) => void;
};

export const LineNumberForm = ({
  max,
  handleLineNumber,
}: LineNumberFormProps) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleLineNumber(data.lineNumber);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "25ch", borderRadius: "10px" },
          }}
        >
          <TextField
            {...register("lineNumber", {
              required: "Line Number Cannot be Blank!",
              min: 1,
              max: max,
              valueAsNumber: true,
            })}
            sx={{ input: { color: "#ffb6c1" }, backgroundColor: "#3c3c3c" }}
            InputLabelProps={{
              style: { color: "#ffffff" },
            }}
            label={`Line Number Input (1 - ${max})`}
            type="number"
            variant={"outlined"}
            error={errors.lineNumber !== undefined}
            helperText={errors.lineNumber ? errors.lineNumber.message : null}
            onBlur={() => clearErrors("lineNumber")}
          />
        </Box>
        <Button onClick={handleSubmit(onSubmit)} variant={"text"}>
          Input
        </Button>
      </Grid>
    </form>
  );
};
