// quad.js
import React from "react";
import {
  color as colorPicker,
  text,
  number,
  boolean,
  object
} from "@storybook/addon-knobs";
import { numberArray, numberArrayArray } from "../utils/story-utils";
import { view3DProps, Ground, Light, KNOB_GROUP } from "../utils/common";
import PointLight from "../../src/lights/PointLight";
import { EPS_NANO } from "../../src/utils/math";

// standard-view
import View3D from "../../src/views/View3D";
import Quad from "../../src/primitives/Quad";

export default function QuadStory(): React.Node {
  const autoRotate = boolean("autoRotate", true, KNOB_GROUP.VIEW3D);
  const colorInput = text("color (input)", "violet", KNOB_GROUP.MATERIAL);
  const color = colorPicker(
    "color",
    colorInput !== "" ? colorInput : undefined,
    KNOB_GROUP.MATERIAL
  );
  const hoverColorInput = text(
    "hoverColor (input)",
    "red",
    KNOB_GROUP.MATERIAL
  );
  const hoverColor = colorPicker(
    "hoverColor",
    hoverColorInput !== "" ? hoverColorInput : undefined,
    KNOB_GROUP.MATERIAL
  );
  const hoverable = boolean("hoverable", true, KNOB_GROUP.MATERIAL);

  return (
    <View3D {...view3DProps} controls={{ autoRotate }}>
      <Ground position={[0, -4, 0]} />
      <Light />
      <PointLight position={[2, 0, 0]} />
      <Quad
        points={object(
          "points",
          [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]],
          KNOB_GROUP.GEOMETRY
        )}
        indices={numberArrayArray(
          "indices",
          [[0, 1, 2], [2, 3, 0]],
          3,
          KNOB_GROUP.GEOMETRY
        )}
        coplanarThreshold={number(
          "coplanarThreshold",
          EPS_NANO,
          {},
          KNOB_GROUP.GEOMETRY
        )}
        position={numberArray("position", [0, 0, 0], 3, KNOB_GROUP.GEOMETRY)}
        scale={numberArray("scale", [1, 1, 1], 3, KNOB_GROUP.GEOMETRY)}
        rotation={numberArray("rotation", [0, 0, 0], 3, KNOB_GROUP.GEOMETRY)}
        normal={numberArray("normal", [0, 0, 1], 3, KNOB_GROUP.GEOMETRY)}
        roll={number("roll", 0, {}, KNOB_GROUP.GEOMETRY)}
        color={color}
        hoverColor={hoverColor}
        hoverable={hoverable}
        opacity={number("opacity", 1, {}, KNOB_GROUP.MATERIAL)}
        side={text("side", "double", KNOB_GROUP.MATERIAL)}
        materialType={text("materialType", "basic", KNOB_GROUP.MATERIAL)}
        castShadow={boolean("castShadow", true, KNOB_GROUP.MATERIAL)}
        wireframe={boolean("wireframe", false, KNOB_GROUP.MATERIAL)}
      />
    </View3D>
  );
}
