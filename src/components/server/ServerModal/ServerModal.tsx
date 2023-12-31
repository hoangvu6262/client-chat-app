import React, { useState, useImperativeHandle, forwardRef, Ref } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";

import CustomModal from "../../shared/Modal/Modal";
import serverAPI from "../../../api/severApi";
import AvatarUpload from "../../shared/AvatarUpload/AvatarUpload";
import useModal from "../../../hooks/useModal";

type Props = {};

export type RefType = {
  onToggle: (data?: Record<string, any>) => void;
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.any(),
});

const ServerModal = (props: Props, ref: Ref<RefType>) => {
  const { open, _handleToggle } = useModal();

  const { user } = useUser();
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  useImperativeHandle(ref, () => ({
    onToggle: _handleToggle,
  }));

  if (!user) {
    return null;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const reader = new FileReader();
      console.log(values.imageUrl[0].mozFullPath);
      const newServer = {
        userId: user.id,
        server: {
          name: values.name,
          imageUrl: values.imageUrl[0].name,
        },
      };
      await serverAPI.createNewServer(newServer);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomModal open={open} handleClose={_handleToggle}>
      <DialogTitle>Create a Server</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Give your server a personality with a name and an image. You can
          always change it later.
        </DialogContentText>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AvatarUpload name="imageUrl" />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              {...register("name")}
              type="text"
              placeholder="Create a new server"
              fullWidth
              //   variant="standard"
            />
            <Button onClick={handleSubmit(onSubmit)}>Create</Button>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={_handleToggle}>Cancel</Button>
      </DialogActions>
    </CustomModal>
  );
};

export default forwardRef(ServerModal);
