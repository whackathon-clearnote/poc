import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { CommonProps } from "@mui/material/OverridableComponent";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface SmallTileProps extends CommonProps {
  statistic: string;
  title: string;
  icon?: ReactNode;
}

export default function SmallTile({
  statistic,
  title,
  icon,
  className,
}: SmallTileProps) {
  return (
    <motion.div
      className="relative z-10"
      animate={{ scale: 1, rotateZ: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{
        scale: [1.05, 1.5, 1.05],
        rotateZ: Math.random() * 60 + 330,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
    >
      <Card className="relative">
        <CardContent className={"relative " + className}>
          {icon && (
            <div className="absolute flex justify-center items-center top-0 right-0 p-2">
              <Avatar
                className="shadow-sm"
                sx={{ bgcolor: "white", color: "darkgray" }}
              >
                {icon}
              </Avatar>
            </div>
          )}
          <Typography variant="h3">{statistic}</Typography>
          <Typography variant="h6">{title}</Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
