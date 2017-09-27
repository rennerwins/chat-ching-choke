import React from 'react';
import Card, { CardContent } from 'material-ui/Card';

function CardWrapper({ className, children }) {
  return (
    <Card className={`mt-3 ${className}`}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default CardWrapper;
