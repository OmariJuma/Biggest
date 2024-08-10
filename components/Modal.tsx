"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { DialogActions, DialogContent } from "@mui/material";
import { categoriessubCategories } from "@/lib/categoriesSubcategories";
import CategoryItem from "./CategoryItem";

export default function Modal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <Dialog fullWidth={true} onClose={handleClose} open={open}>
        <DialogTitle className="font-bold text-3xl">Set Your Interests</DialogTitle>
        <DialogContent>
        <div className="max-w-screen-2xl mx-auto py-10 gap-x-5 px-16 max-md:px-10 gap-y-5 grid grid-cols-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-[450px]:grid-cols-1">

          {categoriessubCategories.categories.map((item) => (
            <CategoryItem
              title={item.name}
              key={item.id}
              href={null}
              image={item.image}
            />
          ))}
          </div>
        </DialogContent>
        <DialogActions>
          <div style={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              className="text-white bg-red-500 mr-0 hover:bg-red-600"
            >
              Skip
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
