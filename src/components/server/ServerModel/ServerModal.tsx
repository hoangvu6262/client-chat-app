import React, { useState, useImperativeHandle, forwardRef, Ref } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import CustomModal from "../../shared/Modal/Modal";

type Props = {};

export type RefType = {
  onOpen: () => void;
  onClose: () => void;
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
});

const ServerModal = (props: Props, ref: Ref<RefType>) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  useImperativeHandle(ref, () => ({
    onOpen: handleOpen,
    onClose: handleClose,
  }));

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // try {
    //   await axios.post("/api/servers", values);
    //   form.reset();
    //   router.refresh();
    //   onClose();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <CustomModal open={open} handleClose={handleClose}>
      <DialogTitle>Create a Server</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Give your server a personality with a name and an image. You can
          always change it later.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          //   label="Email Address"
          type="text"
          placeholder="Create a new server"
          fullWidth
          //   variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </CustomModal>
  );
};

export default forwardRef(ServerModal);
