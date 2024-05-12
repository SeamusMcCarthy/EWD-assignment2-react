import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AuthContextProvider, { useAuth } from "./contexts/authContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import LoginPage from "./pages/loginPage";
import PlaylistPage from "./pages/playlistsPage";
import PlaylistMoviesPage from "./pages/playlistMoviesPage";
import LogoutPage from "./pages/logoutPage";
import MovieCastPage from "./pages/movieCastPage";
import AddPlaylistPage from "./pages/addPlaylistPage";
import AddPlaylistEntryPage from "./pages/addPlaylistEntryPage";
import PlaylistContextProvider from "./contexts/playlistContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { token } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <PlaylistContextProvider>
          <MoviesContextProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              {token && <Route path="/logout" element={<LogoutPage />} />}
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />

              {token && (
                <Route
                  path="/playlists/:playlistName"
                  element={<PlaylistMoviesPage />}
                />
              )}

              {token && <Route path="/playlists" element={<PlaylistPage />} />}
              {token && (
                <Route path="/playlists/add" element={<AddPlaylistPage />} />
              )}
              {token && (
                <Route
                  path="/movies/favourites"
                  element={<FavouriteMoviesPage />}
                />
              )}
              {/* {token && ( */}
              <Route
                path="/playlists/entries/add"
                element={<AddPlaylistEntryPage />}
              />
              {/* )} */}
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/:id/cast" element={<MovieCastPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MoviesContextProvider>
        </PlaylistContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
