import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './bookings.model';
import { ITicket } from 'src/util/types';

@Injectable()
export class BookingsService {
  private event: Booking & { _id: any };
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  validate(eventId: string) {
    if (!eventId && isValidObjectId(eventId)) {
      throw new BadRequestException();
    }
  }

  async find(eventId: string) {
    this.event = await this.bookingModel.findById(eventId);
    if (!this.event) {
      throw new NotFoundException();
    }
  }

  async addTickets(noOfTickets: number): Promise<boolean> {
    const added = await this.event.addTickets(noOfTickets);
    if (!added) {
      return false;
    }
    return true;
  }

  async purchaseTicket(): Promise<ITicket> {
    const ticket = await this.event.purchaseTicket();
    return ticket;
  }


}
