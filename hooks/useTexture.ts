import {LinearMipMapLinearFilter, NearestFilter, RepeatWrapping, Texture, TextureLoader} from "three";
import {useLoader} from "@react-three/fiber";

type Output = {
    texture: Texture,
};
export const useTexture = (
    url: string,
    repeat?: [x: number, y: number] | undefined
): Output => {
    const texture = useLoader(TextureLoader, url);

    texture.magFilter = NearestFilter;
    texture.minFilter = LinearMipMapLinearFilter;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.flipY = false;

    if (!repeat) {
        texture.repeat.set(50, 50);
        return {
            texture,
        };
    }

    const [x, y] = repeat;
    texture.repeat.set(x, y);

    return {
        texture,
    };
};
