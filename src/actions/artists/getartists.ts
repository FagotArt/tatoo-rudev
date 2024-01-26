"use server";

import Unlock from "@/lib/models/unlock";
import User from "@/lib/models/user";
import { withServerAuth } from "@/lib/utils/auth/auth";

interface SearchArtistsOptions {
  filter: Object;
}

const obfuscateContactInfo = async (user: any) => {
  if (!user || !user.contactInfo) {
    return user;
  }

  const obfuscatedContactInfo = Object.keys(user.contactInfo).reduce<Record<any, any>>((acc, key) => {
    const value = user.contactInfo[key];
    if (typeof value === "string" && value.length > 0) {
      acc[key] = obfuscateField(value, key);
    }
    return acc;
  }, {});

  return { ...user, contactInfo: obfuscatedContactInfo,
    obfuscatedName : user?.firstName?.charAt(0)?.toUpperCase() + user?.lastName?.charAt(0).toUpperCase() + "'s Portfolio"
  };
};

const parseFilters = (filters: any, initialQuery: any = {},favoritesList ?: any[]) => {
  const query = initialQuery;
  let sortOptions = {}

  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      const value = filters[key];

      switch (key) {
        case "minHourlyRate":
          query.hourlyRate = { ...query.hourlyRate, $gte: Number(value) };
          break;
        case "maxHourlyRate":
          query.hourlyRate = { ...query.hourlyRate, $lte: Number(value) };
          break;
        case "search":
          query.$text = { $search: value };
          break;
        case 'location':
          query.location = { $in: value?.split(',') }
          break;
        case 'favorite':
          if(value === 'true' && favoritesList){
            query._id = { $in: favoritesList }
          }
          break;
        case 'sort': 
          switch (value) {
            case 'newest':
              sortOptions = { createdAt: -1 }
              break;
            case 'best_reviews':
              sortOptions = { averageRating: -1 }
              break;
            case 'price_asc':
              sortOptions = { hourlyRate: 1 }
              break;
            case 'price_desc':
              sortOptions = { hourlyRate: -1 }
              break;
          }
          break;
        default:
          query[key] = Array.isArray(value) ? { $in: value } : value;
          break;
      }
    }
  }

  return {query,sortOptions};
};

const obfuscateField = (value: any, key: any) => {
  switch (key) {
    case "phone":
      return `${value.slice(0, 3)}********`; // Preserves the country code
    case "email":
      const atIndex = value.indexOf("@");
      return `${value.slice(0, 1)}*****${value.slice(atIndex)}`;
    case "facebook":
    case "instagram":
      return `********`;
    default:
      return value;
  }
};

export const getArtists = withServerAuth(async (session,options?: SearchArtistsOptions) => {
  const favoritesList = session?.user?.favorites;
  const {query,sortOptions} = parseFilters(options?.filter, {
    role: "artist",
  },favoritesList);
  const artists = await User.find(query).sort(sortOptions).select("-settings -password -email -contactInfo");

  return artists;
},{
  ignore: true
});

export const getArtistById = withServerAuth(
  async (session: any, id: string) => {
    try {
      const artist = await User.findOne({
        _id: id,
        role: "artist",
      });

      if (!artist) {
        return {
          error: "Artist not found",
          status: 404,
          message: "Artist not found",
        };
      }

      console.log(artist?.profilePicture);

      if (session?.user) {
        // you cant unlock yourself
        if (artist._id.toString() === session?.user?._id.toString()) {
          return {
            ...artist?.toObject(),
            unlocked: true,
          }
        }
        
        const unlocked = await Unlock.findOne({
          $or: [
            { artist: id, user: session?.user?._id },
            { unlockAll: true, user: session?.user?._id },
          ],
        });

        if (unlocked) {
          return { ...artist?.toObject(), unlocked: true };
        }
      }

      return obfuscateContactInfo(artist?.toObject());
    } catch (error) {
      return {
        error: error,
        status: 500,
        message: "Error",
      };
    }
  },
  {
    ignore: true,
  }
);

export const getArtistByUsername = withServerAuth(
  async (session: any, username: string) => {
    try {
      const artist = await User.findOne({
        username: username,
        role: "artist",
      });

      if (!artist) {
        return {
          error: "Artist not found",
          status: 404,
          message: "The artist you are looking for does not exist.",
        };
      }

      if (session?.user) {
        // you cant unlock yourself
        if (artist._id.toString() === session?.user?._id.toString()) {
          return {
            ...artist?.toObject(),
            unlocked: true,
          }
        }
        const unlocked = await Unlock.findOne({
          $or: [
            { artist: artist._id, user: session?.user?._id },
            { unlockAll: true, user: session?.user?._id },
          ],
        });

        if (unlocked) {
          return { ...artist?.toObject(), unlocked: true };
        }
      }

      return obfuscateContactInfo(artist?.toObject());
    } catch (error: any) {
      return {
        error: error?.message || "Internal server error, please try again later",
        status: 500,
        message: "contact support if you think this is an error on our side",
      };
    }
  },
  {
    ignore: true,
  }
);
