import React, {useEffect} from 'react';
import { useMUD } from "./MUDContext";
import { Navbar } from "./components";
import Phaser from 'phaser';
import { GridEngine } from 'grid-engine';
import preload from './phaser/preload';
import create from './phaser/create';
import update from './phaser/update';
import { usePhaserGame } from './phaser/usePhaserGame';
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { Toaster, toast } from 'react-hot-toast';
import { EncounterScreen } from './catch/EncounterScreen';
import { useEncounterStore } from './store/encounterStore';

export const App = () => {
  // const {
  //   components: { Encounter, MapConfig, Monster, Player, Position },
  //   network: { playerEntity },
  //   systemCalls: { spawn },
  // } = useMUD();

  // const tasks = useStore((state) => {
  //   const records = Object.values(state.getRecords(tables.Tasks));
  //   records.sort((a, b) => Number(a.value.createdAt - b.value.createdAt));
  //   return records;
  // });

  const isLoggedIn = useIsLoggedIn();
  const { encounter } = useEncounterStore();
  const gameConfig = {
    title: "GPTRPG",
    render: {
      antialias: false,
    },
    type: Phaser.AUTO,
    physics: {
      default: "arcade",
    },
    plugins: {
      scene: [
        {
          key: "gridEngine",
          plugin: GridEngine,
          mapping: "gridEngine",
        },
      ],
    },
    scene: {
      preload,
      create,
      update,
    },
    scale: {
      width: window.innerWidth,
      height: window.innerHeight,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: "game",
    backgroundColor: "#48C4F8",
  }

  const game = usePhaserGame(gameConfig);


  useEffect(() => {
    if (isLoggedIn) {
      toast.success("You are logged in");
    }
  }, [isLoggedIn]);

  return (
    <div className="h-screen w-full flex flex-col">
      <Navbar />
      {encounter && (
        <EncounterScreen
              monsterName={"MissingNo"}
              monsterEmoji={"💱"}
            />
      )}
      <div className="grow w-full bg-yellow-500
      hover:cursor-pointer
      " 
        id="game"      
      />

      <Toaster position="top-center" toastOptions={{
          success:{
            style:{
              background: "#FEE9D7",
              color: "#34222E",
              border: "2px solid #53C576",
              borderRadius: "0.375rem",
            }
          },
          error:{
            style:{
              background: "#FEE9D7",
              color: "#34222E",
              border: "2px solid #C33030",
              borderRadius: "0.375rem",
            }
          }
        }}/>
    </div>
  );
};
