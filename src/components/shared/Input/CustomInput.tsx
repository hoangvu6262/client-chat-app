import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";

import { TextField } from "@mui/material";

type Props = {
  label: string;
  name: string;
  type?: string;
  maxRows?: number;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  Icon?: () => JSX.Element;
  errors?: any;
  value?: string;
  disable?: boolean;
};

const CustomInput: React.FC<Props> = ({
  label,
  name,
  type = "text",
  maxRows = 8,
  rows = 1,
  multiline = false,
  required = true,
  placeholder,
  Icon,
  errors,
  value,
  disable = false,
}) => {
  const { register } = useFormContext();

  // const onChangeInput = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {};

  return (
    <div
      className={classNames("cus-input", {
        flextop: multiline,
        flexleftcenter: !multiline,
      })}
    >
      <div className="cus-input__lable">
        {Icon && <Icon />}
        <p>{label}</p>
      </div>
      <TextField
        {...register(name)}
        value={value}
        autoFocus
        size="small"
        margin="dense"
        variant="outlined"
        placeholder={placeholder}
        required={required}
        type={type}
        fullWidth
        multiline={multiline}
        minRows={rows}
        maxRows={maxRows}
        InputProps={{
          readOnly: disable,
        }}
        InputLabelProps={{ shrink: true }}
        // onChange={(e) => onChangeInput(e)}
      />
      <p className="cus-input--err">{errors && errors[name]?.message}</p>
    </div>
  );
};

export default CustomInput;
