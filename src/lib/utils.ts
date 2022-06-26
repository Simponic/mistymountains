import { supabase } from './supabase';

const setImageUrl = (imageSpec) => {
  const { publicURL, error } = supabase
    .storage
    .from('mistymountains')
    .getPublicUrl(imageSpec.image);
  if (!error) {
    return { ...imageSpec, image: publicURL };
  }
  return imageSpec;
}

export default setImageUrl;