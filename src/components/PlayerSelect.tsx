import * as SelectPrimitive from "@radix-ui/react-select";
import { useState } from "react";

function PLayerSelect() {
  const [noOfPlayers, setNoOfPlayers] = useState(2);
  return (
    <SelectPrimitive.Root>
      <SelectPrimitive.SelectTrigger aria-label="number of players">
        <SelectPrimitive.Value placeholder="Select No of Players" />
        <SelectPrimitive.SelectIcon></SelectPrimitive.SelectIcon>
      </SelectPrimitive.SelectTrigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.SelectContent>
          <SelectPrimitive.SelectViewport>
            <SelectPrimitive.SelectGroup>
              <SelectPrimitive.SelectItem value="1">
                1
              </SelectPrimitive.SelectItem>
              <SelectPrimitive.SelectItem value="2">
                2
              </SelectPrimitive.SelectItem>
              <SelectPrimitive.SelectItem value="3">
                3
              </SelectPrimitive.SelectItem>
              <SelectPrimitive.SelectItem value="4">
                4
              </SelectPrimitive.SelectItem>
              <SelectPrimitive.SelectItem value="5">
                5
              </SelectPrimitive.SelectItem>
              <SelectPrimitive.SelectItem value="6">
                6
              </SelectPrimitive.SelectItem>
            </SelectPrimitive.SelectGroup>
          </SelectPrimitive.SelectViewport>
        </SelectPrimitive.SelectContent>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export default PLayerSelect;
