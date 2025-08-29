import { Card, CardContent, Typography } from "@mui/material";
import { CommonProps } from "@mui/material/OverridableComponent";
import { motion } from "motion/react";

interface SmallTileProps extends CommonProps {
  statistic: string;
  title: string;
}

export default function SmallTile({
  statistic,
  title,
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
      {/* backplate */}
      <div className="absolute w-full h-full left-0 top-0 bg-gray-200" />
      <Card className="relative">
        <CardContent className={className}>
          <Typography variant="h3">{statistic}</Typography>
          <Typography variant="h6">{title}</Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
