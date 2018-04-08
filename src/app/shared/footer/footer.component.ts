import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewInit {
  public randomFactText: string;

  constructor() { }

  ngOnInit() {
    this.getRandomFact();
  }

  ngAfterViewInit() {

  }


public getRandomFact() {
  const randomArray = new Array();
  let i = 0;

  // randomArrayS
  randomArray[i] = 'Butterflies cannot fly if their body temperature is less than 86 degrees';
  randomArray[i++] = 'Neurons multiply at a rate 250,000 neurons per minute during early pregnancy.';
  randomArray[i++] = '750ml of blood pumps through your brain every minute which is 15-20% of blood flow from the heart.';
  randomArray[i++] = 'The human brain is about 75% water.';
  randomArray[i++] = 'Flies jump backwards during takeoff.';
  randomArray[i++] = 'A housefly will regurgitate its food and eat it again.';
  randomArray[i++] = 'Termites outweigh humans by almost ten to one.';
  randomArray[i++] = 'Your brain consumes 25 watts of power while you’re awake. This amount of energy is enough to illuminate a lightbulb.';
  randomArray[i++] = 'It is impossible to lick your elbow.';
  randomArray[i++] = 'Intelligent people have more zinc and copper in their hair.';
  randomArray[i++] = 'In every episode of Seinfeld there is a Superman somewhere.';
  randomArray[i++] = 'Wearing headphones for just an hour will increase the bacteria in your ear by 700 times.';
  randomArray[i++] = '13% of Americans actually believe that some parts of the moon are made of cheese.';
  randomArray[i++] = 'Butterflies range in size from a tiny 1/8 inch to a huge almost 12 inches.';
  randomArray[i++] = 'Most household dust is made of dead skin cells.';
  randomArray[i++] = 'One in eight million people has progeria, a disease that causes people to grow faster than they age.';
  randomArray[i++] = 'The male seahorse carries the eggs until they hatch instead of the female.';
  randomArray[i++] = 'Negative emotions such as anxiety and depression can weaken your immune system.';
  randomArray[i++] = 'Stephen Hawking was born exactly 300 years after Galileo died.';
  randomArray[i++] = 'Mercury is the only planet whose orbit is coplanar with its equator.';
  randomArray[i++] = 'Grapes explode when you put them in the microwave. Go on, try it then';
  randomArray[i++] = 'Peanuts are one of the ingredients of dynamite.';
  randomArray[i++] = 'In York, it is perfectly legal to shoot a Scotsman with a bow and arrow (except on Sundays)';
  randomArray[i++] = 'No piece of square dry paper can be folded in half more than 7 times';
  randomArray[i++] = 'The average human eats 8 spiders in their lifetime at night.';
  randomArray[i++] = 'An average human loses about 200 head hairs per day.';
  randomArray[i++] = 'Mexico City sinks about 10 inches a year';
  randomArray[i++] = 'It takes 8 minutes 17 seconds for light to travel from the Sun’s surface to the Earth.';
  randomArray[i++] = 'October 12th, 1999 was declared “The Day of Six Billion” based on United Nations projections.';
  randomArray[i++] = '10 percent of all human beings ever born are alive at this very moment.';
  randomArray[i++] = 'The Earth spins at 1,000 mph but it travels through space at an incredible 67,000 mph.';
  randomArray[i++] = 'Every year over one million earthquakes shake the Earth.';
  randomArray[i++] = 'When Krakatoa erupted in 1883, its force was so great it could be heard 4,800 kilometres away in Australia.';
  randomArray[i++] = 'The largest ever hailstone weighed over 1kg and fell in Bangladesh in 1986.';
  randomArray[i++] = 'Every second around 100 lightning bolts strike the Earth.';
  randomArray[i++] = 'Every year lightning kills 1000 people.';
  randomArray[i++] = 'In October 1999 an Iceberg the size of London broke free from the Antarctic ice shelf .';
  randomArray[i++] = 'If you could drive your car straight up you would arrive in space in just over an hour.';
  randomArray[i++] = 'Human tapeworms can grow up to 22.9m.';
  randomArray[i++] = 'The dinosaurs became extinct before the Rockies or the Alps were formed.';
  randomArray[i++] = 'Female black widow spiders eat their males after mating.';
  randomArray[i++] = 'When a flea jumps, the rate of acceleration is 20 times that of the space shuttle during launch.';
  randomArray[i++] = 'If our Sun were just inch in diameter, the nearest star would be 445 miles away.';
  randomArray[i++] = 'The Australian billygoat plum contains 100 times more vitamin C than an orange.';
  randomArray[i++] = 'Astronauts cannot belch – there is no gravity to separate liquid from gas in their stomachs.';
  randomArray[i++] = 'The air at the summit of Mount Everest, 29,029 feet is only a third as thick as the air at sea level.';
  randomArray[i++] = 'DNA was first discovered in 1869 by Swiss Friedrich Mieschler.';
  randomArray[i++] = 'The molecular structure of DNA was first determined by Watson and Crick in 1953.';
  randomArray[i++] = 'The first synthetic human chromosome was constructed by US scientists in 1997.';
  randomArray[i++] = 'The thermometer was invented in 1607 by Galileo.';
  randomArray[i++] = 'Englishman Roger Bacon invented the magnifying glass in 1250.';
  randomArray[i++] = 'Alfred Nobel invented dynamite in 1866.';
  randomArray[i++] = 'Wilhelm Rontgen won the first Nobel Prize for physics for discovering X-rays in 1895.';
  randomArray[i++] = 'The tallest tree ever was an Australian eucalyptus – In 1872 it was measured at 435 feet tall.';
  randomArray[i++] = 'Christian Barnard performed the first heart transplant in 1967 – the patient lived for 18 days.';
  randomArray[i++] = 'The wingspan of a Boeing 747 is longer than the Wright brother’s first flight.';
  randomArray[i++] = 'An electric eel can produce a shock of up to 650 volts.';
  randomArray[i++] = 'The earliest wine makers lived in Egypt around 2300 BC.';
  randomArray[i++] = 'The Ebola virus kills 4 out of every 5 humans it infects.';
  randomArray[i++] = 'Without its lining of mucus your stomach would digest itself.';
  randomArray[i++] = 'Humans have 46 chromosomes, peas have 14 and crayfish have 200.';
  randomArray[i++] = 'There are 60,000 miles of blood vessels in the human body.';
  randomArray[i++] = 'An individual blood cell takes about 60 seconds to make a complete circuit of the body.';
  randomArray[i++] = 'Utopia ia a large, smooth lying area of Mars.';
  randomArray[i++] = 'The low frequency call of the humpback whale is the loudest noise made by a living creature.';
  randomArray[i++] = 'The call of the humpback whale is louder than Concorde and can be heard from 500 miles away.';
  randomArray[i++] = 'A quarter of the world’s plants are threatened with extinction by the year 2010.';
  randomArray[i++] = 'At 15 inches the eyes of giant squids are the largest on the planet.';
  randomArray[i++] = 'Each person sheds 40lbs of skin in his or her lifetime.';
  randomArray[i++] = 'The largest galexies contain a million, million stars.';
  randomArray[i++] = 'The Universe contains over 100 billion galaxies.';
  randomArray[i++] = 'Wounds infested with maggots heal quickly and without spread of gangrene or other infection.';
  randomArray[i++] = 'More germs are transferred shaking hands than kissing.';
  randomArray[i++] = 'The longest glacier in Antarctica, the Almbert glacier, is 250 miles long and 40 miles wide.';
  randomArray[i++] = 'The fastest speed a falling raindrop can hit you is 18mph.';
  randomArray[i++] = 'The world’s smallest winged insect, the Tanzanian parasitic wasp, is smaller than the eye of a housefly.';
  randomArray[i++] = 'It would take over an hour for a heavy object to sink 6.7 miles down to the deepest part of the ocean.';
  randomArray[i++] = 'The grey whale migrates 12,500 miles from the Artic to Mexico and back every year.';
  randomArray[i++] = 'Over 350 million Rubik’s Cubes have been sold worldwide – making it the bestselling toy/product of all time.';
  randomArray[i++] = 'Every legal permutation of the Rubik’s Cube can be solved in 20 moves or fewer';
  randomArray[i++] = 'Light would take .13 seconds to travel around the Earth.';
  randomArray[i++] = 'Even travelling at the speed of light it would take 2 million years to reach the nearest large galaxy, Andromeda.';
  randomArray[i++] = 'Fishing is the biggest participant sports in the world.';
  randomArray[i++] = 'Soccer is the most attended or watched sport in the world.';
  randomArray[i++] = 'Boxing became a legal sport in 1901.';
  randomArray[i++] = 'The record for the most major league Bbaseball career innings is held by Cy Young, with 7,356 innings.';
  randomArray[i++] = 'The baseball home plate is 17 inches wide.';
  randomArray[i++] = 'Golf the only sport played on the moon - on 6 February 1971 Alan Shepard hit a golf ball.';
  randomArray[i++] = 'Donkeys kill more people than plane crashes.';
  randomArray[i++] = 'It takes 12,000 head of cattle to produce one pound of adrenaline.';
  randomArray[i++] = 'In Bangladesh, kids as young as 15 can be jailed for cheating on their finals.';
  randomArray[i++] = 'A crocodile cannot stick its tongue out.';
  randomArray[i++] = 'Honey does not spoil.';
  randomArray[i++] = 'Adult elephants can’t jump.';
  randomArray[i++] = 'Jet lag was once called boat lag, before there were jets.';
  randomArray[i++] = 'There are about 450 types of cheese in the world. 240 come from France.';
  randomArray[i++] = 'The number “four” is considered unlucky in Japan because it is pronounced the same as “death”.';
  randomArray[i++] = 'The electric chair was invented by a dentist.';
  randomArray[i++] = 'England is smaller than New England.';
  randomArray[i++] = 'It’s impossible to sneeze with your eyes open.';
  randomArray[i++] = 'Switzerland is the only country with a square flag.';
  randomArray[i++] = 'In 10 minutes, a hurricane releases more energy than all the world’s nuclear weapons combined.';
  randomArray[i++] = 'Ancient Egyptians shaved off their eyebrows to mourn the deaths of their cats.';
  randomArray[i++] = 'Illinois has the highest number of personalized license plates than any other state.';
  randomArray[i++] = 'The average American/Canadian will eat about 11.9 pounds of cereal per year!';
  randomArray[i++] = 'More than 90% of the Nicaraguan people are Roman Catholic.';
  randomArray[i++] = 'A necropsy is an autopsy on animals.';
  randomArray[i++] = 'Rugby, North Dakota is the geographical center of North America.';
  randomArray[i++] = 'The U.S. Post Office handles 43 percent of the world’s mail.';
  randomArray[i++] = 'A lightning bolt generates temperatures five times hotter than those found on the sun’s surface.';
  randomArray[i++] = 'There is actually no danger in swimming right after you eat, though it may feel uncomfortable.';
  randomArray[i++] = 'In the Arctic, the sun sometimes appears to be square.';
  randomArray[i++] = 'Camel’s have three eyelids.';
  randomArray[i++] = 'The average person laughs 10 times a day!';
  randomArray[i++] = 'There are two credit cards for every person in the United States.';

  const which = Math.round(Math.random() * (randomArray.length - 1));
  this.randomFactText = randomArray[which];
}

}
