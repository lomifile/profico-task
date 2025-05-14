import {
  GeneralIcon,
  BusinessIcon,
  HealthIcon,
  ScienceIcon,
  SportsIcon,
  TechnologyIcon,
  HomeIcon,
} from "@app/ui/custom-icons/icons";
import { Bookmark } from "lucide-react";

export const menuItems = [
  {
    icon: <HomeIcon />,
    title: "Home",
    route: "featured",
  },
  {
    title: "General",
    icon: <GeneralIcon />,
    route: "general",
  },
  {
    title: "Business",
    icon: <BusinessIcon />,
    route: "business",
  },
  {
    title: "Health",
    icon: <HealthIcon />,
    route: "health",
  },
  {
    title: "Science",
    icon: <ScienceIcon />,
    route: "science",
  },
  {
    title: "Sports",
    icon: <SportsIcon />,
    route: "sports",
  },
  {
    title: "Technology",
    icon: <TechnologyIcon />,
    route: "technology",
  },
  {
    title: "Bookmarks",
    icon: <Bookmark />,
    route: "bookmarks",
    isAuth: true,
  },
];
