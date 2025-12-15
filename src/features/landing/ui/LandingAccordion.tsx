import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';

export type LandingFaq = {
  question: string;
  answer: string;
};

type Props = {
  faqs: LandingFaq[];
  defaultExpandedIndex?: number;
};

export const LandingAccordion = ({ faqs, defaultExpandedIndex = 0 }: Props) => (
  <Stack sx={{ width: '100%', borderRadius: 0 }}>
    {faqs.map((faq, idx) => (
      <Accordion
        key={faq.question}
        disableGutters
        square={false}
        defaultExpanded={idx === defaultExpandedIndex}
        sx={{
          bgcolor: 'background.grey',
          borderBottom: '1px solid var(--grey-200)',
          boxShadow: 'none',
          '&::before': { display: 'none' },
          '&:first-child': { borderTop: '2px solid var(--grey-800)', borderRadius: 0 },
          '&:last-child': { borderRadius: 0 },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, p: '30px 20px' }}>
            {faq.question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', color: 'text.secondary', p: 10, pt: 0, pb: 15 }}>
            {faq.answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    ))}
  </Stack>
);
