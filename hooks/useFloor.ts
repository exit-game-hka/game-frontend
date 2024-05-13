import {LinearMipMapLinearFilter, NearestFilter, RepeatWrapping, Texture, TextureLoader} from "three";
import {useLoader} from "@react-three/fiber";

type Output = {
    texture: Texture,
};
export const useFloor = (url: string): Output => {
    // Floor
    const floorTexture = useLoader(TextureLoader, url);

    floorTexture.magFilter = NearestFilter;
    floorTexture.minFilter = LinearMipMapLinearFilter;
    floorTexture.wrapS = RepeatWrapping;
    floorTexture.wrapT = RepeatWrapping;
    floorTexture.flipY = false;
    floorTexture.repeat.set(50, 50);

    return {
        texture: floorTexture,
    };
}