import React from "react";
import { GroupProps } from "react-three-fiber";
import BaseBoard from "./BaseBoard";

import AtomPillar from "./AtomPillar";
import AtomInfo from "../types/AtomInfo";
import atomData from "../atomData";
import { Styler } from "./Control/stylers";
import { CubeTexture } from "three";

interface PeriodicTableProps {
  placement: number[][];
  onClickPillar: (v: AtomInfo) => void;

  realMaxHeight: number;
  propGetter: (v: AtomInfo) => number | undefined;

  isLogScale: boolean;

  styler: Styler;
  envMap: CubeTexture;
}

export default function PeriodicTable({
  placement,
  onClickPillar,
  realMaxHeight,
  propGetter,
  isLogScale,
  styler,
  envMap,
  ...props
}: PeriodicTableProps & GroupProps) {
  let heightData: (number | undefined)[] = atomData.map(propGetter);

  if (isLogScale)
    heightData = heightData.map((v) =>
      v === undefined ? undefined : Math.log10(Math.max(v, 0.00001) + 1)
    );

  const pillars = [];
  const maxHeight = Math.max(...heightData.map((v) => v || 0));

  for (let i = 0; i < placement.length; i++) {                                  // BaseBoard + Pillars 만들어주는 부분
    for (let j = 0; j < placement[i].length; j++) {                             // 전체 placement(위치)에 따라서 AtomData에서 데이터 바인딩
      const number = placement[i][j];
      if (number !== 0) {
        const atom = atomData[number - 1];
        let height = heightData[number - 1];

        const realHeight = Math.max(
          height === undefined ? 0 : (height / maxHeight) * realMaxHeight,
          0.01
        );

        const style =                                                           // Pillar 스타일 적용 부분
          height === undefined                                                  // 높이 없으면(group:none) 기본값
            ? { color: "#ff6b6b", opacity: 0.5 }
            : styler(atom, height, maxHeight);

        pillars.push(
          <AtomPillar
            key={number}
            atom={atom}
            position={[j - 8.5, 0.5, i - 5.7]}
            height={realHeight}
            style={style}                                                       // 스타일 지정
            envMap={envMap}
            onClick={() => onClickPillar(atom)}
          />
        );
      }
    }
  }

  return (
    <group {...props}>
      <BaseBoard>
        <group>{pillars}</group>
      </BaseBoard>
    </group>
  );
}
