import React, { useEffect, useState } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { SongCard } from "./DashboardSongs";
import Filter from "./Filter";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { blue_200, blue_600, banner } from "../assets/img";
import Release from "./Release";
import { filterByLanguage } from "../utils/supportfunctions";

const Home = () => {
  const [
    {
      searchTerm,
      isSongPlaying,
      song,
      allSongs,
      artistFilter,
      filterTerm,
      albumFilter,
      languageFilter,
    },
    dispatch,
  ] = useStateValue();

  const [filteredSongs, setFilteredSongs] = useState(null);

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  // useEffect(() => {
  //   if (searchTerm.length > 0) {
  //     const filtered = allSongs.filter(
  //       (data) =>
  //         data.artist.toLowerCase().includes(searchTerm) ||
  //         data.language.toLowerCase().includes(searchTerm) ||
  //         data.name.toLowerCase().includes(searchTerm) ||
  //         data.artist.includes(artistFilter)
  //     );
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [searchTerm]);

  // useEffect(() => {
  //   const filtered = allSongs?.filter((data) => data.artist === artistFilter);
  //   if (filtered) {
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [artistFilter]);

  useEffect(() => {
    const filterByLanguage = allSongs?.filter(
      (data) => data.category.toLowerCase() === filterTerm
    );
    if (filterByLanguage) {
      setFilteredSongs(filterByLanguage);
    } else {
      setFilteredSongs(null);
    }
  }, [filterTerm]);

  // useEffect(() => {
  //   const filtered = allSongs?.filter((data) => data.album === albumFilter);
  //   if (filtered) {
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [albumFilter]);

  useEffect(() => {
    const filterByLanguage = allSongs?.filter(
      (data) => data.language === languageFilter
    );

    if (filterByLanguage) {
      setFilteredSongs(filterByLanguage);
    } else {
      setFilteredSongs(null);
    }
  }, [languageFilter]);

  return (
    <div className="relative w-full h-auto flex flex-col justify-center bg_website_02">
      <Header />
      <div className="w-full h-full absolute z-0">
        <img
          className="w-656 h-510 right-0 absolute "
          src={blue_200}
          alt="blue_200"
        />
        <img src={blue_600} alt="blue_600" />
      </div>

      <div className="h-auto w-full mt-16 z-1-3">
        <img
          src={banner}
          alt="banner"
          className="absolute z-10 md:p-32 h-auto w-full flex justify-center "
        />
        <div className="w-full ">
          <img
            src={banner}
            alt="banner"
            className=" h-screen z-2-3 w-auto blur-sm items-center"
          />
        </div>
      </div>
      {/* {searchTerm.length > 0 && (
        <p className="m-4 text-base text-white right-0 z-10">
          Searched for :
          <span className="text-xl text-white font-semibold">{searchTerm}</span>
        </p>
      )}

      <Filter className={"z-30"} setFilteredSongs={setFilteredSongs} />

      <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4"></div>
 */}
      {/* Content ThinhHanh */}
      <div className="md:px-20 z-0">
        <div className="my-10">
          <div className=" text-white font-medium flex justify-between">
            <div className="my-2 text-2xl">Khám phá</div>
            <div className="px-4 my-2 text-lg">Tất cả</div>
          </div>
          <div className="h-56 w-full grid grid-rows-1 scroll-hidden gap-10 items-center overscroll-behavior-x-contain overflow-x-scroll">
            <div className="flex flex-nowrap">
              <KhamPhaSongContainer musics={allSongs} />
            </div>
          </div>
        </div>

        {/* <dir>
          <Release setFilteredSongs={setFilteredSongs} />
          <ReleaseSongContainer
            musics={filteredSongs ? filteredSongs : allSongs}
          />
        </dir> */}
        {/* <Filter setFilteredSongs={setFilteredSongs} /> */}
        <Filter className={"z-30"} setFilteredSongs={setFilteredSongs} />
        <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4">
          <HomeSongContainer
            musics={filteredSongs ? filteredSongs : allSongs}
          />
        </div>

        <div className="my-10">
          <div className=" text-white font-medium flex justify-between">
            <div className="my-2 text-2xl">Top 10</div>
            <div className="px-4 my-2 text-lg">Tất cả</div>
          </div>
          <div className="h-72 w-full grid grid-rows-1 scroll-hidden gap-10 items-center overscroll-behavior-x-contain overflow-x-scroll">
            <div className="flex flex-nowrap">
              <Top10SongContainer musics={allSongs} />
            </div>
          </div>
        </div>

        <div className="my-10">
          <div className=" text-white font-medium flex justify-between">
            <div className="my-2 text-2xl">Thể loại</div>
            <div className="px-4 my-2 text-lg">Tất cả</div>
          </div>
          <div className="h-40 w-full grid grid-rows-1 scroll-hidden gap-10 items-center overscroll-behavior-x-contain overflow-x-scroll">
            <div className="flex flex-nowrap">
              <TheLoaiSongContainer musics={allSongs} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const HomeSongContainer = ({ musics }) => {
  const [{ isSongPlaying, song }, dispatch] = useStateValue();

  const addSongToContext = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };
  return (
    <>
      {musics?.map((data, index) => (
        <motion.div
          key={data._id}
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
          onClick={() => addSongToContext(index)}
        >
          <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={data.imageURL}
              alt=""
              className=" w-full h-full rounded-lg object-cover"
            />
          </div>

          <p className="text-base text-headingColor font-semibold my-2">
            {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
            <span className="block text-sm text-gray-400 my-1">
              {data.artist}
            </span>
          </p>
        </motion.div>
      ))}
    </>
  );
};
export const ReleaseSongContainer = ({ musics }) => {
  const [{ isSongPlaying, song }, dispatch] = useStateValue();

  const addSongToContext = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };
  return (
    <>
      {musics?.map((data, index) => (
        <div>
          <motion.div
            key={data._id}
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className=" cursor-pointer hover:shadow-xl hover:bg-card h-12 w-225 bg-slate-400 mr-10 rounded-lg border-4 border-gray-300"
            onClick={() => addSongToContext(index)}
          >
            <div className="h-12 w-225 bg-blue-300 rounded-lg drop-shadow-lg relative overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={data.imageURL}
                alt=""
                className=" w-full h-full rounded-lg object-cover"
              />
              <p className="text-base text-headingColor font-semibold my-2">
                {data.name.length > 25
                  ? `${data.name.slice(0, 25)}`
                  : data.name}
                <span className="block text-sm text-gray-400 my-1">
                  {data.artist}
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      ))}
    </>
  );
};

export const KhamPhaSongContainer = ({ musics }) => {
  const [{ isSongPlaying, song }, dispatch] = useStateValue();

  const addSongToContext = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };
  return (
    <>
      {musics?.map((data, index) => (
        <div>
          <motion.div
            key={data._id}
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className=" cursor-pointer hover:shadow-xl hover:bg-card h-auto w-275 bg-slate-400 mr-6 rounded-lg border-4 border-gray-300"
            onClick={() => addSongToContext(index)}
          >
            <div className="w-full min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={data.imageURL}
                alt=""
                className=" w-full h-full rounded-lg object-cover"
              />
            </div>
          </motion.div>
        </div>
      ))}
    </>
  );
};

export const Top10SongContainer = ({ musics }) => {
  const [{ isSongPlaying, song }, dispatch] = useStateValue();

  const addSongToContext = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };
  return (
    <>
      {musics?.map((data, index) => (
        <div>
          <motion.div
            key={data._id}
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className=" cursor-pointer hover:shadow-xl hover:bg-card h-auto w-auto bg-slate-400 mr-16 rounded-xl border-4 border-gray-300"
            onClick={() => addSongToContext(index)}
          >
            <div className="h-56 min-w-[160px] w-56 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={data.imageURL}
                alt=""
                className=" w-full h-full rounded-lg object-cover"
              />
            </div>
          </motion.div>
        </div>
      ))}
    </>
  );
};

export const TheLoaiSongContainer = ({ musics }) => {
  const [{ isSongPlaying, song }, dispatch] = useStateValue();

  const addSongToContext = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };
  return (
    <>
      {musics?.map((data, index) => (
        <div>
          <motion.div
            key={data._id}
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className=" cursor-pointer hover:shadow-xl hover:bg-card h-auto w-auto bg-slate-400 mr-10 rounded-lg border-4 border-gray-300"
            onClick={() => addSongToContext(index)}
          >
            <div className="h-28 min-w-[160px] w-275  rounded-lg drop-shadow-lg relative overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={data.imageURL}
                alt=""
                className=" w-full h-full rounded-lg object-cover"
              />
            </div>
          </motion.div>
        </div>
      ))}
    </>
  );
};

export default Home;
