import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

Meteor.methods({
  async deleteUser(userId) {
    check(userId, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "no-auth",
        "Debes iniciar sesión."
      );
    }

    if (this.userId === userId) {
      throw new Meteor.Error(
        "self-delete",
        "No puedes eliminar tu propia cuenta."
      );
    }

    const currentUser = await Meteor.users.findOneAsync(
      { _id: this.userId },
      { fields: { "profile.role": 1 } }
    );

    if (currentUser?.profile?.role !== "admin") {
      throw new Meteor.Error(
        "not-authorized",
        "Solo un administrador puede eliminar usuarios."
      );
    }

    const targetUser = await Meteor.users.findOneAsync(userId);

    if (!targetUser) {
      throw new Meteor.Error(
        "not-found",
        "Usuario no encontrado."
      );
    }

    const { Auctions } = await import("./Auctions");

    await Auctions.removeAsync({ owner: userId });
    await Meteor.users.removeAsync(userId);

    return true;
  },
});