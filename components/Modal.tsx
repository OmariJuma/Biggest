"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { categoriessubCategories } from "@/lib/categoriesSubcategories";
import CategoryItem from "./CategoryItem";

export default function Modal() {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <Dialog fullWidth={true} maxWidth="xl" onClose={handleClose} open={open} >
      <DialogActions>
          <div style={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              className="text-white bg-red-500 mr-0 hover:bg-red-600"
              onClick={handleClose}
            >
              close
            </Button>
          </div>
        </DialogActions>
        <DialogTitle className="font-bold text-3xl">
          Set Your Interests
        </DialogTitle>
        
        <DialogContent>
          <div className="max-w-screen-2xl mx-auto py-10 gap-x-5 px-16 max-md:px-10 gap-y-5 grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[450px]:grid-cols-1">
            {categoriessubCategories.categories.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    checked={selectedValues.includes(item.id.toString())}
                    onChange={handleChange}
                    value={item.id}
                  />
                }
                label={
                  <CategoryItem
                    title={item.name}
                    href={null}
                    image={item.image}
                  />
                }
                className={`rounded-lg p-2 border-4 ${selectedValues.includes(item.id.toString()) ? 'border-blue-500' : 'border-transparent'}`}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <div style={{ textAlign: "right" }}>
            {selectedValues.length>0 ? <Button
              variant="outlined"
              className="text-white bg-blue-700 mr-0 hover:bg-blue-500"
              onClick={handleClose}
              >
              Set Interests
            </Button>
            :
            <Button
            variant="contained"
            disabled={true}
          >
            Set Interests
          </Button>
          }
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
