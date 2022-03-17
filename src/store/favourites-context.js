import React, { useEffect, useReducer } from "react";

const initialFavourites = 
  localStorage.getItem("favourites")
  ? JSON.parse(localStorage.getItem("favourites"))
  : {launches: [], launchPads: []};

const FavouritesContext = React.createContext({
  favourites: initialFavourites,
  favouriteLaunch: () => {},
  unfavouriteLaunch: () => {},
  favouriteLaunchPad: () => {},
  unfavouriteLaunchPad: () => {}
})

const ACTIONS = {
  FAVOURITE_LAUNCH: "FAVOURITE_LAUNCH",
  UNFAVOURITE_LAUNCH: 'UNFAVOURITE_LAUNCH',
  FAVOURITE_LAUNCHPAD: "FAVOURITE_LAUNCHPAD",
  UNFAVOURITE_LAUNCHPAD: 'UNFAVOURITE_LAUNCHPAD',
};

const favouritesReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FAVOURITE_LAUNCH: {
      return {
        launches: [...state.launches, action.data], 
        launchPads: state.launchPads
      }
    }
    case ACTIONS.UNFAVOURITE_LAUNCH: {
      return {
        launches: state.launches.filter(launch => launch.flight_number !== action.data.flight_number), 
        launchPads: state.launchPads
      }
    }
    case ACTIONS.FAVOURITE_LAUNCHPAD: {
      return {
        launches: state.launches, 
        launchPads: [...state.launchPads, action.data]
      }
    }
    case ACTIONS.UNFAVOURITE_LAUNCHPAD: {
      return {
        launches: state.launches, 
        launchPads: state.launchPads.filter(launchPad => launchPad.site_id !== action.data.site_id)
      }
    }
    default:
      return state;
  }
};

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, dispatchFavourites] = useReducer(favouritesReducer, initialFavourites)

  useEffect(() => {
    localStorage.setItem(
      "favourites",
      JSON.stringify(favourites)
    );
  }, [favourites]);

  const favouriteLaunch = (launch) => {
    dispatchFavourites ({
      type: ACTIONS.FAVOURITE_LAUNCH,
      data: launch,
    });
  }

  const unfavouriteLaunch = (launch) => {
    dispatchFavourites ({
      type: ACTIONS.UNFAVOURITE_LAUNCH,
      data: launch,
    });
  }

  const favouriteLaunchPad = (launchPad) => {
    dispatchFavourites ({
      type: ACTIONS.FAVOURITE_LAUNCHPAD,
      data: launchPad,
    });
  }

  const unfavouriteLaunchPad = (launchPad) => {
    dispatchFavourites ({
      type: ACTIONS.UNFAVOURITE_LAUNCHPAD,
      data: launchPad,
    });
  }

  return (
    <FavouritesContext.Provider 
      value={{ favourites, favouriteLaunch, unfavouriteLaunch, favouriteLaunchPad, unfavouriteLaunchPad }}
    >
      { children }
    </FavouritesContext.Provider>
  )
}

export default FavouritesContext;