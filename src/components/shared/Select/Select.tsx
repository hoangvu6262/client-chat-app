import React from "react";
import { Box, Select, MenuItem } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import classNames from "classnames";

import "./styles.scss";

type Item = {
  id: string;
  name: string;
};

type Props = {
  name: string;
  label?: string;
  listItem: Item[];
  id: string;
  errors?: any;
};

const CommonSelect: React.FC<Props> = ({
  name,
  label,
  listItem = [],
  id,
  errors = {},
}) => {
  const { control } = useFormContext();

  return (
    <>
      <div
        className={classNames("common-select", {
          error: errors && errors[name],
        })}
      >
        <p>{label}</p>
        <Box>
          <Controller
            render={({ field }) => (
              <>
                <Select {...field} id={id} fullWidth displayEmpty size="small">
                  <MenuItem disabled value="">
                    <em>Please select an item</em>
                  </MenuItem>
                  {listItem.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
            control={control}
            name={name}
            defaultValue=""
          />
          <p className="common-select--err">
            {errors && errors[name]?.message}
          </p>
        </Box>
      </div>
    </>
  );
};

export default CommonSelect;
