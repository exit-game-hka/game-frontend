import React from "react";
import {ObjectMultiplierComponent} from "@/components/ObjectMultiplierComponent";
import {Tree} from "@/components/Tree";
import {WORLD_COORDINATE} from "@/app/contants";
import {Cloud} from "@/components/Cloud";
import {GroundComponent} from "@/components/GroundComponent";

export const RoomWithForestComponent: React.FC = () => {
    return (
      <>
          <ObjectMultiplierComponent
              key={1}
              model={Tree}
              count={1000}
              // @ts-ignore
              scale={0.06}
              getPosition={() => [
                  (Math.random() * 2 - 1) * 300,
                  WORLD_COORDINATE[1],
                  (Math.random() * 2 - 1) * 300
              ]}
          />

          <ObjectMultiplierComponent
              key={2}
              model={Cloud}
              count={1000}
              getPosition={() => [
                  (Math.random() * 2 - 1) * 300,
                  40,
                  (Math.random() * 2 - 1) * 300
              ]}
          />
          <GroundComponent position={WORLD_COORDINATE}/>
      </>
    );
}