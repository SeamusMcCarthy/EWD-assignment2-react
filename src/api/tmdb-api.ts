export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=1`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get movie data. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getProfile = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get profile data. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      import.meta.env.VITE_TMDB_KEY +
      "&language=en-US"
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch genres. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = (id: number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    })
    .then((json) => json.posters)
    .catch((error) => {
      throw error;
    });
};

export const getActorImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/images?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    })
    .then((json) => json.posters)
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};

export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&page=1`
  )
    .then((res) => res.json())
    .then((json) => json.results);
};

export const getPopularMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity&api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=1`
  )
    .then((res) => res.json())
    .then((json) => json.results);
};

export const getMovieCast = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US`
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return json.cast;
    });
};

export const getDiscography = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=1`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.cast;
    });
};

export const awsLogin = (id: string, password: string) => {
  const data = {
    username: id,
    password,
  };
  return fetch(
    "https://xebjoxe2c9.execute-api.eu-west-1.amazonaws.com/prod/auth/signin",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
      },
    }
  ).then((response) => {
    return response.json();
  });
};

export const getPlaylists = (username: string, token: string) => {
  return fetch(
    `https://i28i9cj6v0.execute-api.eu-west-1.amazonaws.com/prod/users/${username}/playlists`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${token}`,
        "Set-Cookie": `token=${token}`,
        cookie: `token=${token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json.data;
    });
};

export const addPlaylist = (
  userName: string,
  playlistName: string,
  token: string
) => {
  const data = {
    userName,
    playlistName,
  };
  return fetch(
    `https://i28i9cj6v0.execute-api.eu-west-1.amazonaws.com/prod/users/${userName}/playlists`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${token}`,
        "Set-Cookie": `token=${token}`,
        cookie: `token=${token}`,
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json.data;
    });
};

export const addPlaylistEntry = (
  movieId: number,
  playlistName: string,
  token: string
) => {
  const data = {
    playlistName,
    movieId,
  };
  return fetch(
    `https://i28i9cj6v0.execute-api.eu-west-1.amazonaws.com/prod/playlists/${playlistName}/entries`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${token}`,
        "Set-Cookie": `token=${token}`,
        cookie: `token=${token}`,
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json.data;
    });
};

export const getPlaylistEntries = (playlistName: string, token: string) => {
  return fetch(
    `https://i28i9cj6v0.execute-api.eu-west-1.amazonaws.com/prod/playlists/${playlistName}/entries`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${token}`,
        "Set-Cookie": `token=${token}`,
        cookie: `token=${token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json.data;
    });
};
