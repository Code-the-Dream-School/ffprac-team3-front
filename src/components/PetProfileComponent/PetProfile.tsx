import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Stack,
  Button,
  Breadcrumbs,
  Modal,
  TextField,
} from "@mui/material";
import FavoriteButton from "../PetCardComponent/FavoriteButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import { getAllPetData, uploadPdf } from "../../util/index";
import getBreedListByType from "../PetComponents/PetData/PetData";
import { ObjectId } from "mongodb";

interface Animal {
  _id: string | ObjectId;
  type: string;
  breed: string;
  age: string;
  sex: string;
  name: string;
  description: string;
  isFavorite: boolean;
  fileImages: FileImages;
  location: Location;
  fileMedical: FileMedical;
}

interface FileImages {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  id: ObjectId;
  filename: string;
  metadata: null;
  bucketName: string;
  chunkSize: number;
  size: number;
  uploadDate: Date;
  contentType: string;
}

interface FileMedical {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  id: ObjectId;
  filename: string;
  metadata: null;
  bucketName: string;
  chunkSize: number;
  size: number;
  uploadDate: Date;
  contentType: string;
}

interface Location {
  state: string;
  city: string;
  zip: string;
}

interface PetCardProps {
  animal: Animal;
  onToggleFavorite: (_id: string) => void;
}

export const PetProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { _id, type, name } = useParams<{
    _id: string;
    type: string;
    name: string;
  }>();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [animal, setAnimal] = useState<Animal | undefined>();
  const [favoriteAnimals, setFavoriteAnimals] = useState<Animal[]>([]);
  const [file, setFile] = useState<string | Blob>('')
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fileRef = useRef(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  console.log(_id)

  const handleToggleFavorite = (_id: ObjectId) => {
    const jwtToken = localStorage.getItem('jwtToken');
    const storedFavoriteAnimals = JSON.parse(localStorage.getItem('favoriteAnimals') || '[]');
    let newFavoriteAnimals = [...storedFavoriteAnimals];
  
    const animalIndex = storedFavoriteAnimals.findIndex(animal => animal._id === _id);
  
    if (animalIndex === -1) {
      const animalToAdd = animals.find(animal => animal._id === _id);
      if (animalToAdd) {
        newFavoriteAnimals.push(animalToAdd);
      }
    } else {
      newFavoriteAnimals.splice(animalIndex, 1);
    }
  
    setFavoriteAnimals(newFavoriteAnimals);
    localStorage.setItem('favoriteAnimals', JSON.stringify(newFavoriteAnimals));
  };

  const formatAge = (age: string) => {
    const ageNum = parseFloat(age);

    // Check if ageNum is NaN
    if (isNaN(ageNum)) {
      return age; // Return the original age string if it's not a valid number
    }
    if (ageNum >= 2) {
      return age + " years";
    } else if (ageNum === 1) {
      return age + " year";
    } else {
      const months = ageNum * 12;
      return months + " months";
    }
  };

  useEffect(() => {
    const fetchingData = async () => {
      const response = await getAllPetData();
      const animalData = response?.data?.petData?.map((pet) => ({
        ...pet,
        breed: getBreedListByType(pet.type).includes(pet.breed)
          ? pet.breed
          : "", // If the breed is not found in the breed list, set it to an empty string
      }));
      animalData?.map((pet) => {
        pet._id.toString();
      });
      setAnimals(animalData);
    };

    fetchingData();
  }, []);

  useEffect(() => {
    // Fetch animal details based on the ID from the URL
    const selectedAnimal = animals?.find(
      (animal) => animal._id === String(_id)
    );

      setAnimal(selectedAnimal);
      setLoading(false);
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    //} else {
      //setLoading(false);
    //}
  }, [_id, animals]);

  // useEffect(() => {
    // Refresh favorite status on component mount
    //const storedFavorite = localStorage.getItem(`favorite_${_id}`);
    //if (storedFavorite !== null) {
      //setAnimal((prevAnimal) => {
        //if (prevAnimal) {
          //return { ...prevAnimal, isFavorite: JSON.parse(storedFavorite) };
        //}
        //return prevAnimal;
      //});
    //}
    //() => onToggleFavorite(animal?._id)
  // }, []);

  useEffect(() => {
    // Remember scroll position when component unmounts
    const handleScroll = () => {
      sessionStorage.setItem("scrollPosition", String(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Scroll to the remembered position when component mounts
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    }
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePdfUpload = async (event) => {
    event.preventDefault();
    console.log(file);
    await uploadPdf(_id, file);
    setFile("");
    window.location.reload();
    setOpen(true);
  };

  const handleSetFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  if (loading) {
    // Handle case when animal is still loading or not found
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "#EE633E" }} />
      </Box>
    );
  }
  if (!animal) {
    // Handle case when animal is not found
    return (
      <Typography variant="h2" align="center">
        Animal not found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#0E2728",
        width: "100vw",
        py: "8rem",
        ml: "-8px",
        pr: "8px",
      }}
    >
      <Card
        sx={{
          mx: "4rem",
          p: { xs: "2rem", md: "4rem" },
          border: "1px solid #0E2728",
          borderRadius: "5px",
          backgroundColor: "#F4F2EA",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            variant="text"
            onClick={handleGoBack}
            sx={{
              color: "#0E2728",
              boxShadow: "none",
              backgroundColor: "transparent",
              fontSize: "1rem",
              "&:hover": {
                color: "#506C60",
                boxShadow: "none",
                backgroundColor: "transparent",
              },
            }}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </Breadcrumbs>

        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "40% 60%" }, // Single column on small screens
            gap: 4,
          }}
        >
          <CardMedia
            sx={{
              height: 450,
              minHeight: 300,
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "1rem",
              mt: "2rem",
            }}
            image={
              "http://localhost:8000/api/v1/pets/uploads/" +
              animal.fileImages.filename
            }
            title={animal.name}
          />
          <Stack
            sx={{
              order: { xs: 2, md: 1 }, // Change order on smaller screens
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: "#EE633E",
                fontWeight: 600,
                pt: { xs: 0, md: "2rem" },
                letterSpacing: 1,
                display: "flex",
              }}
            >
              {animal.name}

              <FavoriteButton
                onToggleFavorite={handleToggleFavorite}
                animalId={animal._id as ObjectId}
              />
            </Typography>

            <Typography
              variant="h5"
              sx={{ color: "#0E2728", fontWeight: 400, pt: "1.5rem" }}
            >
              {animal.type} &nbsp;|&nbsp; {animal.breed}
              &nbsp;|&nbsp; {formatAge(
                animal.age.toString()
              )} &nbsp;|&nbsp; {animal.sex}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#0F2117",
                my: "1rem",
                mr: { xs: "0", md: "3rem" },
              }}
            >
              {animal.description}
            </Typography>
            <CardActions
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
                mt: "3rem",
                mb: "2rem",
              }}
            >
              <Button
                variant="contained"
                size="large"
                href="/contactus"
                sx={{
                  backgroundColor: "#EE633E",
                  py: "1rem",
                  "&:hover": {
                    backgroundColor: "#df522d",
                  },
                }}
              >
                start adoption inquiry
              </Button>
              <Button
                variant="contained"
                size="large"
                aria-label="sponsor pet"
                sx={{
                  backgroundColor: "#F8AF3F",
                  py: "1rem",
                  "&:hover": { backgroundColor: "#eea535" },
                }}
                onClick={handleOpen}
              >
                pet's medical history
              </Button>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    py: "8rem",
                    ml: "-8px",
                    pr: "8px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    boxShadow: 24,
                    p: 4,
                    backgroundColor: "#F4F2EA",
                    textAlign: "center",
                    borderRadius: "5px",
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ color: "#EE633E", fontWeight: 600, letterSpacing: 1 }}
                  >
                    Upload Pet's Medical History
                  </Typography>
                  <form
                    action="/upload"
                    method="patch"
                    ref={formRef}
                    onSubmit={handlePdfUpload}
                  >
                    <TextField
                      id="file"
                      label=""
                      variant="filled"
                      type="file"
                      name="fileMedical"
                      ref={fileRef}
                      onChange={(e) => handleSetFile(e)}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        backgroundColor: "#F8AF3F",
                        py: "0.3rem",
                        px: "3rem",
                        "&:hover": { backgroundColor: "#eea535" },
                        my: "0.3rem",
                      }}
                    >
                      Upload
                    </Button>
                  </form>
                  {animal.fileMedical ? (
                    <div>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                          color: "#EE633E",
                          fontWeight: 600,
                          fontSize: "1rem",
                          letterSpacing: 1,
                        }}
                      >
                        This pet already has a Medical Record
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                          color: "#EE633E",
                          fontWeight: 600,
                          fontSize: "1rem",
                          letterSpacing: 1,
                        }}
                      >
                        <a
                          href={
                            "http://localhost:8000/api/v1/pets/history/uploads/" +
                            animal.fileMedical.filename
                          }
                          download={animal.name + " Medical History"}
                        >
                          View/Download Medical History
                        </a>
                      </Typography>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </Box>
              </Modal>
            </CardActions>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
