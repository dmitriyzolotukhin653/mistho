import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { INews } from '../../effects/news/type';

interface INewsList {
  news: INews[];
  isLogin: boolean;
  clickHandler: (link: string, id: number) => void;
}

export const NewsList: React.FC<INewsList> = ({ news, isLogin, clickHandler }) => {
  return (
    <>
      {news.map((item, i) => (
        <Card key={i} sx={{ gridArea: i === 0 ? 'first' : '.' }}>
          {item.img && (
            <CardMedia
              component="img"
              height={i === 0 ? '360' : '180'}
              image={item?.img}
              alt="news"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant={i === 0 ? 'h3' : 'h5'} component="div">
              {item?.title}
            </Typography>
            <Typography variant={i === 0 ? 'h6' : 'body2'} color="text.secondary">
              {item?.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            {isLogin && (
              <Button onClick={() => clickHandler(item.link, i)} size="small">
                Learn More
              </Button>
            )}
          </CardActions>
        </Card>
      ))}
    </>
  );
};
