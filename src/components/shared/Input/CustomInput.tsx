import { useRef, ChangeEvent } from "react";
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
}) => {
  const { register } = useFormContext();
  const inputRef = useRef(null);

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};

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
        inputRef={inputRef}
        // name={name}
        {...register(name)}
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
        InputLabelProps={{ shrink: true }}
        // onChange={(e) => onChangeInput(e)}
      />
      {/* <p className="cus-input--err">{errors && t(errors[name]?.message)}</p> */}
    </div>
  );
};

export default CustomInput;
