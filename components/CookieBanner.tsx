"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import "@/app/globals.css"; // Import the CSS file
import axios from "axios";
import Modal from "./Modal";

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  const [showPreferenceModal, setShowPreferenceModal] =
    useState<boolean>(false);

  const onCloseHandler = useCallback(() => {
    if (selected === "true") {
      setShowPreferenceModal(true);
    }
    setShowBanner(false);
  }, [selected]);

  useEffect(() => {
    const fetchCookieValue = async () => {
      try {
        const response = await fetch("/api/getCookie?name=cookieConsent");
        if (response.status === 404) {
          setShowBanner(true);
          return;
        }
        const data = await response.json();
        if (!data.value) {
          setShowBanner(true);
        }
      } catch (error) {
        console.error("Error fetching cookie value:", error);
      }
    };
    const interest = async () => {
      const response = await fetch("/api/getCookie?name=interests");
      if (response.status === 404) {
        return;
      }
      const data = await response.json();
      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch (error) {
        parsedData = data;
      }
    };
    fetchCookieValue();
    interest();
  }, []);

  const setCookiePreference = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const response = await axios.post("/api/setCookie", {
          name: "cookieConsent",
          value: selected,
        });

        if (!response?.data) {
          throw new Error("Failed to set cookie");
        }
        if (selected === "true") {
          setShowPreferenceModal(true);
        }
        setShowBanner(false);
      } catch (error) {
        console.error("Error setting cookie:", error);
      }
    },
    [selected]
  );

  return (
    <>
      <Dialog
        open={showBanner}
        onClose={onCloseHandler}
        transitionDuration={{ enter: 500, exit: 500 }}
      >
        <DialogTitle className="text-center">Cookie Consent</DialogTitle>
        <DialogContent>
          <form
            onSubmit={setCookiePreference}
            className="flex flex-col justify-center items-center p-6 rounded-lg shadow-xl"
          >
            <p className="text-black text-center mb-4">
              We use cookies to improve your experience. By using our site, you
              accept our use of cookies.
            </p>
            <FormControl variant="outlined" className="mb-4 w-full">
              <InputLabel htmlFor="consent" className="text-black">
                Do you accept cookies?
              </InputLabel>
              <Select
                name="consent"
                id="consent"
                defaultValue=""
                className="p-2 rounded-md border text-black border-gray-300"
                label="Do you accept cookies?"
                onChange={(e) => setSelected(e.target.value)}
              >
                <MenuItem value="false">No</MenuItem>
                <MenuItem value="true">Yes</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!selected}
              className="mt-4 bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-700 transition duration-300"
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {showPreferenceModal && <Modal />}
    </>
  );
};

export default CookieBanner;
