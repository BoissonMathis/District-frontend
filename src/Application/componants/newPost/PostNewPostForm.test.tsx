import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PostNewPostForm } from "./PostNewPostForm"; // Assurez-vous que ce chemin est correct
import { useUserConnectedPosts } from "../../../Module/Observable/userConnected/UserConnectedPosts.observable";
import { useUserConnected } from "../../../Module/Observable/userConnected/UserConnected.observable";
import { postUserPost } from "../../../Module/Observable/modal/PostForm.observable";

// Importer jest-dom pour les matchers
import "@testing-library/jest-dom";

// Mock des modules externes
jest.mock(
  "../../../Module/Observable/userConnected/UserConnectedPosts.observable",
  () => ({
    useUserConnectedPosts: jest.fn(),
    setUserConnectedPosts: jest.fn(),
  })
);

jest.mock(
  "../../../Module/Observable/userConnected/UserConnected.observable",
  () => ({
    useUserConnected: jest.fn(),
  })
);

jest.mock("../../../Module/Observable/modal/PostForm.observable", () => ({
  postUserPost: jest.fn(),
  setPostForm: jest.fn(),
}));

describe("PostNewPostForm", () => {
  const mockUserConnected = {
    _id: "user123",
    profil_image: "profile.jpg",
    username: "JohnDoe",
    status: "Online",
  };

  const mockPosts = {
    page: 1,
    posts: [],
  };

  beforeEach(() => {
    // Mock les données utilisateur et posts
    (useUserConnected as jest.Mock).mockReturnValue(mockUserConnected);
    (useUserConnectedPosts as jest.Mock).mockReturnValue(mockPosts);

    // Mock de console.error pour capturer les erreurs dans les tests
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Nettoyage des mocks de console.error après chaque test
    jest.restoreAllMocks();
  });

  test("renders post form and allows posting", async () => {
    render(<PostNewPostForm />);

    // Vérifier si les informations utilisateur sont affichées
    expect(screen.getByText(/JohnDoe - Online/i)).toBeInTheDocument();
    expect(screen.getByAltText("")).toHaveAttribute("src", "profile.jpg");

    // Vérifier si le champ texte est rendu
    const textInput = screen.getByPlaceholderText(
      "De quoi voulez-vous parler ?"
    ) as HTMLInputElement;
    expect(textInput).toBeInTheDocument();

    // Simuler la saisie dans le champ texte
    fireEvent.change(textInput, {
      target: { value: "Ceci est un nouveau post" },
    });
    expect(textInput.value).toBe("Ceci est un nouveau post");

    // Simuler l'ajout d'une image
    const fileInput = screen.getByLabelText(/Ajouter une image/i);
    const file = new File(["image-content"], "image.png", {
      type: "image/png",
    });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Simuler le clic sur le bouton publier
    const publishButton = screen.getByRole("button", { name: /publier/i });
    fireEvent.click(publishButton);

    // Vérifier si la fonction postUserPost a été appelée
    await waitFor(() => {
      expect(postUserPost).toHaveBeenCalledWith(
        mockUserConnected._id,
        "Ceci est un nouveau post",
        localStorage.token,
        file
      );
    });
  });

  test("handles error when posting fails", async () => {
    // Simuler une erreur lors de l'envoi du post
    (postUserPost as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Error adding new post");
    });

    render(<PostNewPostForm />);

    // Simuler la saisie dans le champ texte
    const textInput = screen.getByPlaceholderText(
      "De quoi voulez-vous parler ?"
    );
    fireEvent.change(textInput, {
      target: { value: "Ceci est un nouveau post" },
    });

    // Simuler le clic sur le bouton publier
    const publishButton = screen.getByRole("button", { name: /publier/i });
    fireEvent.click(publishButton);

    // Vérifier si l'erreur est capturée et affichée dans la console
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error adding new post:",
        expect.any(Error)
      );
    });
  });
});
