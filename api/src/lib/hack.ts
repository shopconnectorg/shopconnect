import { core } from "@0xpolygonid/js-sdk";

if (!('Scroll' in core.Blockchain)) {
  const Scroll = 'scroll';
  [core.DidMethod.Iden3, core.DidMethod.PolygonId].forEach(method => 
    Object.assign(core.DidMethodNetwork[method], {
      [`${Scroll}:${core.NetworkId.Main}`]: 0b01000000 | 0b00000001,
      [`${Scroll}:${core.NetworkId.Sepolia}`]: 0b01000000 | 0b00000010,
    })
  );
  Object.assign(core.Blockchain, { Scroll });
}

if (!('Mantle' in core.Blockchain)) {
  const Mantle = 'mantle';
  [core.DidMethod.Iden3, core.DidMethod.PolygonId].forEach(method => 
    Object.assign(core.DidMethodNetwork[method], {
      [`${Mantle}:${core.NetworkId.Main}`]: 0b01010000 | 0b00000001,
      [`${Mantle}:${core.NetworkId.Test}`]: 0b01010000 | 0b00000010,
    })
  );
  Object.assign(core.Blockchain, { Mantle });
}